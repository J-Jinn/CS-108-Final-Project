#!/usr/bin/env python3
# coding=utf-8
# Copyright 2018 Google AI, Google Brain and Carnegie Mellon University Authors and the HuggingFace Inc. team.
# Copyright (c) 2018, NVIDIA CORPORATION.  All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
""" Conditional text generation with the auto-regressive models of the library (GPT/GPT-2/CTRL/Transformer-XL/XLNet)
"""

import argparse
import logging

import numpy as np
import torch

# from transformers import (
#     CTRLLMHeadModel,
#     CTRLTokenizer,
#     GPT2LMHeadModel,
#     GPT2Tokenizer,
#     OpenAIGPTLMHeadModel,
#     OpenAIGPTTokenizer,
#     TransfoXLLMHeadModel,
#     TransfoXLTokenizer,
#     XLMTokenizer,
#     XLMWithLMHeadModel,
#     XLNetLMHeadModel,
#     XLNetTokenizer,
# )

logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(name)s -   %(message)s",
    datefmt="%m/%d/%Y %H:%M:%S",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

MAX_LENGTH = int(10000)  # Hardcoded max length to avoid infinite loop

MODEL_CLASSES = {
    # "gpt2": (GPT2LMHeadModel, GPT2Tokenizer),
    # "ctrl": (CTRLLMHeadModel, CTRLTokenizer),
    # "openai-gpt": (OpenAIGPTLMHeadModel, OpenAIGPTTokenizer),
    # "xlnet": (XLNetLMHeadModel, XLNetTokenizer),
    # "transfo-xl": (TransfoXLLMHeadModel, TransfoXLTokenizer),
    # "xlm": (XLMWithLMHeadModel, XLMTokenizer),
}

# Padding text to help Transformer-XL and XLNet with short prompts as proposed by Aman Rusia
# in https://github.com/rusiaaman/XLNet-gen#methodology
# and https://medium.com/@amanrusia/xlnet-speaks-comparison-to-gpt-2-ea1a4e9ba39e
PREFIX = """In 1991, the remains of Russian Tsar Nicholas II and his family
(except for Alexei and Maria) are discovered.
The voice of Nicholas's young son, Tsarevich Alexei Nikolaevich, narrates the
remainder of the story. 1883 Western Siberia,
a young Grigori Rasputin is asked by his father and a group of men to perform magic.
Rasputin has a vision and denounces one of the men as a horse thief. Although his
father initially slaps him for making such an accusation, Rasputin watches as the
man is chased outside and beaten. Twenty years later, Rasputin sees a vision of
the Virgin Mary, prompting him to become a priest. Rasputin quickly becomes famous,
with people, even a bishop, begging for his blessing. <eod> </s> <eos>"""


#################################################################################################################

def set_seed(args):
    np.random.seed(args.seed)
    torch.manual_seed(args.seed)
    if args.n_gpu > 0:
        torch.cuda.manual_seed_all(args.seed)


#################################################################################################################
# Functions to prepare models' input.

def prepare_ctrl_input(args, _, tokenizer, prompt_text):
    if args.temperature > 0.7:
        logger.info("CTRL typically works better with lower temperatures (and lower top_k).")

    encoded_prompt = tokenizer.encode(prompt_text, add_special_tokens=False)
    if not any(encoded_prompt[0] == x for x in tokenizer.control_codes.values()):
        logger.info("WARNING! You are not starting your generation from a control code so you won't get good results")
    return prompt_text


def prepare_xlm_input(args, model, tokenizer, prompt_text):
    # kwargs = {"language": None, "mask_token_id": None}

    # Set the language
    use_lang_emb = hasattr(model.config, "use_lang_emb") and model.config.use_lang_emb
    if hasattr(model.config, "lang2id") and use_lang_emb:
        available_languages = model.config.lang2id.keys()
        if args.xlm_language in available_languages:
            language = args.xlm_language
        else:
            language = None
            while language not in available_languages:
                language = input("Using XLM. Select language in " + str(list(available_languages)) + " >>> ")

        model.config.lang_id = model.config.lang2id[language]
        # kwargs["language"] = tokenizer.lang2id[language]

    # TODO fix mask_token_id setup when configurations will be synchronized between models and tokenizers
    # XLM masked-language modeling (MLM) models need masked token
    # is_xlm_mlm = "mlm" in args.model_name_or_path
    # if is_xlm_mlm:
    #     kwargs["mask_token_id"] = tokenizer.mask_token_id

    return prompt_text


def prepare_xlnet_input(args, _, tokenizer, prompt_text):
    prefix = args.prefix if args.prefix else args.padding_text if args.padding_text else PREFIX
    prompt_text = prefix + prompt_text
    return prompt_text


def prepare_transfoxl_input(args, _, tokenizer, prompt_text):
    prefix = args.prefix if args.prefix else args.padding_text if args.padding_text else PREFIX
    prompt_text = prefix + prompt_text
    return prompt_text


#################################################################################################################

PREPROCESSING_FUNCTIONS = {
    "ctrl": prepare_ctrl_input,
    "xlm": prepare_xlm_input,
    "xlnet": prepare_xlnet_input,
    "transfo-xl": prepare_transfoxl_input,
}


#################################################################################################################

def adjust_length_to_model(length, max_sequence_length):
    if length < 0 and max_sequence_length > 0:
        length = max_sequence_length
    elif 0 < max_sequence_length < length:
        length = max_sequence_length  # No generation bigger than model size
    elif length < 0:
        length = MAX_LENGTH  # avoid infinite loop
    return length


#################################################################################################################

def main(my_string="Default"):
    """
    Generates text prediction after parsing for required/optional command-line arguments.

    Note: Adapted for use with Web App front-end.

    :param my_string: string to use for text generation/prediction.
    :return: generated/predicted text and associated data.
    """
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--model_type",
        default=None,
        type=str,
        required=False,
        help="Model type selected in the list: " + ", ".join(MODEL_CLASSES.keys()),
    )
    parser.add_argument(
        "--model_name_or_path",
        default=None,
        type=str,
        required=False,
        help="Path to pre-trained model or shortcut name selected in the list: " + ", ".join(MODEL_CLASSES.keys()),
    )

    parser.add_argument("--prompt", type=str, default="")
    parser.add_argument("--length", type=int, default=20)
    parser.add_argument("--stop_token", type=str, default=None, help="Token at which text generation is stopped")

    parser.add_argument(
        "--temperature",
        type=float,
        default=1.0,
        help="temperature of 1.0 has no effect, lower tend toward greedy sampling",
    )
    parser.add_argument(
        "--repetition_penalty", type=float, default=1.0, help="primarily useful for CTRL model; in that case, use 1.2"
    )
    parser.add_argument("--k", type=int, default=0)
    parser.add_argument("--p", type=float, default=0.9)

    parser.add_argument("--prefix", type=str, default="", help="Text added prior to input.")
    parser.add_argument("--padding_text", type=str, default="", help="Deprecated, the use of `--prefix` is preferred.")
    parser.add_argument("--xlm_language", type=str, default="", help="Optional language when used with the XLM model.")

    parser.add_argument("--seed", type=int, default=42, help="random seed for initialization")
    parser.add_argument("--no_cuda", action="store_true", help="Avoid using CUDA when available")
    parser.add_argument("--num_return_sequences", type=int, default=1, help="The number of samples to generate.")
    parser.add_argument(
        "--fp16",
        action="store_true",
        help="Whether to use 16-bit (mixed) precision (through NVIDIA apex) instead of 32-bit",
    )
    args = parser.parse_args()
    #################################################################################################################
    # Intercept and manually set required/optional arguments.
    args.model_type = "gpt2"
    args.model_name_or_path = "gpt2"

    debug_args = 0
    if debug_args:
        print(f"Contents of 'args':\n{args}")
        print(f"Data type of 'args': {type(args)}")

    args.device = torch.device("cuda" if torch.cuda.is_available() and not args.no_cuda else "cpu")
    args.n_gpu = 0 if args.no_cuda else torch.cuda.device_count()

    logger.warning(
        "device: %s, n_gpu: %s, 16-bits training: %s",
        args.device,
        args.n_gpu,
        args.fp16,
    )

    #################################################################################################################

    set_seed(args)

    # # Initialize the model and tokenizer
    # try:
    #     args.model_type = args.model_type.lower()
    #     model_class, tokenizer_class = MODEL_CLASSES[args.model_type]
    # except KeyError:
    #     raise KeyError("the model {} you specified is not supported. You are welcome to add it and open a PR :)")

    # tokenizer = tokenizer_class.from_pretrained(args.model_name_or_path)
    # model = model_class.from_pretrained(args.model_name_or_path)
    # model.to(args.device)

    # Use smaller pre-trained model for faster performance while developing.
    from transformers import AutoTokenizer, AutoModelForCausalLM
    tokenizer = AutoTokenizer.from_pretrained("distilgpt2")
    model = AutoModelForCausalLM.from_pretrained("distilgpt2")
    model.to(args.device)

    if args.fp16:
        model.half()

    args.length = adjust_length_to_model(args.length, max_sequence_length=model.config.max_position_embeddings)
    logger.info(args)

    #################################################################################################################
    # Outer while loop to keep on asking for source text for prediction (deprecated when we finish web app).
    debug = 0  # Enable/disable debug statements.
    loop_count = 0
    while loop_count < 1:
        # prompt_text = args.prompt if args.prompt else input("Model prompt >>> ")  # For console use.
        prompt_text = my_string  # For web app use.

        # Different models need different input formatting and/or extra arguments
        requires_preprocessing = args.model_type in PREPROCESSING_FUNCTIONS.keys()
        if requires_preprocessing:
            prepare_input = PREPROCESSING_FUNCTIONS.get(args.model_type)
            preprocessed_prompt_text = prepare_input(args, model, tokenizer, prompt_text)

            if model.__class__.__name__ in ["TransfoXLLMHeadModel"]:
                tokenizer_kwargs = {"add_space_before_punct_symbol": True}
            else:
                tokenizer_kwargs = {}

            encoded_prompt = tokenizer.encode(
                preprocessed_prompt_text, add_special_tokens=False, return_tensors="pt", **tokenizer_kwargs
            )
        else:
            prefix = args.prefix if args.prefix else args.padding_text
            encoded_prompt = tokenizer.encode(prefix + prompt_text, add_special_tokens=False, return_tensors="pt")
        encoded_prompt = encoded_prompt.to(args.device)
        if debug:
            print(f"Encoded Prompt: {encoded_prompt}")  # Token IDs

        if encoded_prompt.size()[-1] == 0:
            input_ids = None
        else:
            input_ids = encoded_prompt

        # print(f"Model: {model}")
        # TODO: Learn how to redirect model to use generation_utils_original.bak.py generate_modified() function instead.
        output_data = model.generate(  # Calls generate() function in generation_utils.py
            input_ids=input_ids,
            max_length=args.length + len(encoded_prompt[0]),
            temperature=args.temperature,
            top_k=args.k,
            top_p=args.p,
            repetition_penalty=args.repetition_penalty,
            do_sample=True,
            num_return_sequences=args.num_return_sequences,
        )
        if debug:
            print(f"Output Data:\n{output_data}")

        output_sequences = output_data["Encoded Tokens"]

        # Remove the batch dimension when returning multiple sequences
        if len(output_sequences.shape) > 2:
            output_sequences.squeeze_()

        generated_sequences = []

        for generated_sequence_idx, generated_sequence in enumerate(output_sequences):
            print("=== GENERATED SEQUENCE {} ===".format(generated_sequence_idx + 1))
            generated_sequence = generated_sequence.tolist()
            if debug:
                print(f"Generated Sequence Index: {generated_sequence_idx}")
                print(f"Generated Sequence: {generated_sequence}")
                print(f"Generated sequence to list: {generated_sequence}")

            # Decode text
            text = tokenizer.decode(generated_sequence, clean_up_tokenization_spaces=True)

            # Remove all text after the stop token
            text = text[: text.find(args.stop_token) if args.stop_token else None]

            # Add the prompt at the beginning of the sequence. Remove the excess text that was used for pre-processing
            total_sequence = (
                    prompt_text + text[len(tokenizer.decode(encoded_prompt[0], clean_up_tokenization_spaces=True)):]
            )
            generated_sequences.append(total_sequence)
            if debug:
                print(f"Decoded Text (pre-processing excess text removed):\n{text}")
                print(f"List of Generated Sequence(s):\n{generated_sequences}")
            print(f"Initial Source + Predicted Text:\n{total_sequence}")
        loop_count += 1

        # Post-process generated model output data in preparation to send via Flask to Web App.
        send_to_flask = {}
        send_to_flask["Encoded Prediction"] = generated_sequence
        send_to_flask["Decoded Prediction"] = text
        if debug:
            print(f"Encoded Prediction: {generated_sequence}")
            print(f"Decoded Prediction: {text}")

        individual_token_data = output_data["Individual Token Data"]
        for key, value in individual_token_data.items():
            debug_loop = 0
            if not value:
                # Skip if nested dictionary is empty.
                continue
            if debug_loop:
                print(f"Key: {key}")
                print(f"Value:{value}")
            data = []
            log_scores = value["Log Scores"].tolist()
            probs = value["Probabilities"].tolist()
            scores = value["Scores"].tolist()
            encoded_next_token = value["Next Token"].tolist()
            decoded_next_token = tokenizer.decode(encoded_next_token, clean_up_tokenization_spaces=True)
            encoded_next_token_options = value["Next Token Options"].tolist()

            decoded_next_token_options = []
            for token in encoded_next_token_options[0]:
                decoded = tokenizer.decode(token, clean_up_tokenization_spaces=True)
                decoded_next_token_options.append(decoded)

            data.append(encoded_next_token)
            data.append(decoded_next_token)
            data.append(encoded_next_token_options)
            data.append(decoded_next_token_options)
            # data.append(scores)
            # data.append(log_scores)
            # data.append(probs)
            send_to_flask["Token" + key] = data

            if debug_loop:
                print(f"encoded_next_token:{type(encoded_next_token)}")
                print(f"decoded_next_token:{type(decoded_next_token)}")
                print(f"encoded_next_token_options:{type(encoded_next_token_options)}")
                print(f"decoded_next_token_options:{type(decoded_next_token_options)}")
                print(f"scores:{type(scores)}")
                print(f"log_scores:{type(log_scores)}")
                print(f"probs:{type(probs)}")
                print(f"Encoded Next Token: {encoded_next_token}")
                print(f"Decoded Next Token: {decoded_next_token}")
                print(f"Encoded Next Token Options: {encoded_next_token_options}")
                print(f"Decoded Next Token Options: {decoded_next_token_options}")

        if debug:
            # print(f"Data to send to Flask:\n{send_to_flask}")
            print(f"Length of data to send to flask: {len(send_to_flask)}")

    # return generated_sequences
    return send_to_flask


"""
Example invocation (if running from the command-line): 

    python model.py --model_type=gpt2 --model_name_or_path=gpt2

Location of pre-trained model cache: 

    C:\\Users\\Sorce\\.cache\\torch\\transformers

More options for invocation:

Namespace(device=device(type='cpu'), fp16=False, k=0, length=20, model_name_or_path='gpt2', model_type='gpt2', n_gpu=0, 
no_cuda=False, num_return_sequences=1, p=0.9, padding_text='', prefix='', prompt='', repetition_penalty=1.0, seed=42, 
stop_token=None, temperature=1.0, xlm_language='')

####################################################################
FutureWarning: The class `AutoModelWithLMHead` is deprecated and will be removed in a future version. 
Please use `AutoModelForCausalLM` for causal language models, `AutoModelForMaskedLM` for masked language models 
and `AutoModelForSeq2SeqLM` for encoder-decoder models.
"""
if __name__ == "__main__":
    main()
