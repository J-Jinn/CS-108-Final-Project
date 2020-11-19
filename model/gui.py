"""
gui.py defines a Tkinter GUI that generates predictions from GPT-2 based on user input.

Note: Since not async, GUI will freeze until prediction data is returned and processed.

Course: CS-108 Intro to Computing
Instructor: Professor Keith VanderLinden
Student: Joseph Jinn
Date: 11-20-20
"""

from tkinter import Tk, Label, Button, Entry, StringVar, Frame, Text, Scrollbar, \
    RIGHT, LEFT, X, Y, YES, NO, BOTH, Message, END
from tkinter.font import Font
import model

testDataDict = {
    "Model Input": "You are not",
    "Decoded Prediction": "You are not a fan of the Dota2 meta. We are not here to announce anything new about the upcoming",
    "Encoded Prediction": [
        1639,
        389,
        407,
        257,
        4336,
        286,
        262,
        30710,
        17,
        13634,
        13,
        775,
        389,
        407,
        994,
        284,
        5453,
        1997,
        649,
        546,
        262,
        7865
    ],
    "Token 0": [
        257,
        " a",
        [
            [
                257,
                3142,
                18832,
                284,
                10770,
                21305,
                1498,
                6590,
                7151,
                2672
            ]
        ],
        [
            " a",
            " allowed",
            " logged",
            " to",
            " restricted",
            " celebrities",
            " able",
            " violent",
            " recommended",
            " required"
        ]
    ],
    "Token 1": [
        4336,
        " fan",
        [
            [
                4336,
                2726,
                922,
                9379,
                4436,
                3218,
                1720,
                1175,
                17076,
                7748
            ]
        ],
        [
            " fan",
            " serious",
            " good",
            " robot",
            " hospital",
            " regular",
            " product",
            " war",
            " vacuum",
            " permanent"
        ]
    ],
    "Token 10": [
        407,
        " not",
        [
            [
                407,
                257,
                845,
                6635,
                1016,
                3296,
                4753,
                287,
                7960,
                994
            ]
        ],
        [
            " not",
            " a",
            " very",
            " totally",
            " going",
            " fans",
            " definitely",
            " in",
            " worried",
            " here"
        ]
    ],
    "Token 11": [
        994,
        " here",
        [
            [
                994,
                257,
                3375,
                1804,
                5410,
                1016,
                3772,
                2282,
                3573,
                281
            ]
        ],
        [
            " here",
            " a",
            " talking",
            " doing",
            " planning",
            " going",
            " happy",
            " saying",
            " particularly",
            " an"
        ]
    ],
    "Token 12": [
        284,
        " to",
        [
            [
                284,
                329,
                8,
                4,
                9,
                7,
                3,
                1,
                5,
                0
            ]
        ],
        [
            " to",
            " for",
            ")",
            "%",
            "*",
            "(",
            "$",
            "\"",
            "&",
            "!"
        ]
    ],
    "Token 13": [
        5453,
        " announce",
        [
            [
                5453,
                1309,
                4404,
                13463,
                13121,
                1560,
                651,
                16521,
                1650,
                7719
            ]
        ],
        [
            " announce",
            " let",
            " defend",
            " praise",
            " complain",
            " tell",
            " get",
            " apologize",
            " sit",
            " promote"
        ]
    ],
    "Token 14": [
        1997,
        " anything",
        [
            [
                1997,
                644,
                345,
                257,
                326,
                597,
                649,
                534,
                1865,
                477
            ]
        ],
        [
            " anything",
            " what",
            " you",
            " a",
            " that",
            " any",
            " new",
            " your",
            " yet",
            " all"
        ]
    ],
    "Token 15": [
        649,
        " new",
        [
            [
                649,
                475,
                1593,
                326,
                11,
                13,
                14996,
                17347,
                393,
                546
            ]
        ],
        [
            " new",
            " but",
            " important",
            " that",
            ",",
            ".",
            " fancy",
            " definitive",
            " or",
            " about"
        ]
    ],
    "Token 16": [
        546,
        " about",
        [
            [
                546,
                393,
                1201,
                11,
                13,
                379,
                284,
                290,
                357,
                326
            ]
        ],
        [
            " about",
            " or",
            " since",
            ",",
            ".",
            " at",
            " to",
            " and",
            " (",
            " that"
        ]
    ],
    "Token 17": [
        262,
        " the",
        [
            [
                262,
                257,
                340,
                674,
                30710,
                644,
                514,
                15034,
                534,
                703
            ]
        ],
        [
            " the",
            " a",
            " it",
            " our",
            " Dota",
            " what",
            " us",
            " Counter",
            " your",
            " how"
        ]
    ],
    "Token 18": [
        7865,
        " upcoming",
        [
            [
                7865,
                983,
                6846,
                4041,
                30710,
                7002,
                1074,
                2872,
                1080,
                4269
            ]
        ],
        [
            " upcoming",
            " game",
            " latter",
            " League",
            " Dota",
            " journey",
            " team",
            " match",
            " system",
            " stream"
        ]
    ],
    "Token 2": [
        286,
        " of",
        [
            [
                286,
                4,
                8,
                9,
                7,
                3,
                1,
                5,
                0,
                2
            ]
        ],
        [
            " of",
            "%",
            ")",
            "*",
            "(",
            "$",
            "\"",
            "&",
            "!",
            "#"
        ]
    ],
    "Token 3": [
        262,
        " the",
        [
            [
                262,
                4346,
                1835,
                13071,
                6186,
                2183,
                366,
                1553,
                1578,
                606
            ]
        ],
        [
            " the",
            " football",
            " Ob",
            " Hans",
            " Amazon",
            " custom",
            " \"",
            " dr",
            " United",
            " them"
        ]
    ],
    "Token 4": [
        30710,
        " Dota",
        [
            [
                30710,
                8096,
                40858,
                564,
                4918,
                5006,
                2656,
                1573,
                983,
                2003
            ]
        ],
        [
            " Dota",
            " featured",
            " UEFA",
            " \ufffd",
            " funding",
            " cars",
            " original",
            " word",
            " game",
            " future"
        ]
    ],
    "Token 5": [
        17,
        "2",
        [
            [
                17,
                362,
                8,
                4,
                9,
                7,
                3,
                1,
                5,
                0
            ]
        ],
        [
            "2",
            " 2",
            ")",
            "%",
            "*",
            "(",
            "$",
            "\"",
            "&",
            "!"
        ]
    ],
    "Token 6": [
        13634,
        " meta",
        [
            [
                13634,
                10937,
                5794,
                3715,
                12159,
                13,
                2055,
                2168,
                7756,
                3968
            ]
        ],
        [
            " meta",
            " Arena",
            " format",
            " scene",
            " beta",
            ".",
            " community",
            " series",
            " tournament",
            " culture"
        ]
    ],
    "Token 7": [
        13,
        ".",
        [
            [
                13,
                11,
                475,
                996,
                355,
                2035,
                351,
                543,
                393,
                1865
            ]
        ],
        [
            ".",
            ",",
            " but",
            " though",
            " as",
            " either",
            " with",
            " which",
            " or",
            " yet"
        ]
    ],
    "Token 8": [
        775,
        " We",
        [
            [
                775,
                679,
                314,
                2080,
                770,
                2773,
                1892,
                1320,
                198,
                4816
            ]
        ],
        [
            " We",
            " He",
            " I",
            " With",
            " This",
            " Some",
            " Not",
            " That",
            "\n",
            " Team"
        ]
    ],
    "Token 9": [
        389,
        " are",
        [
            [
                389,
                7062,
                815,
                588,
                423,
                1949,
                743,
                1975,
                9144,
                892
            ]
        ],
        [
            " are",
            " welcome",
            " should",
            " like",
            " have",
            " try",
            " may",
            " believe",
            " appreciate",
            " think"
        ]
    ]
}


#####################################################################################################

# noinspection DuplicatedCode
class App:
    """Defines a class that creates the Tkinter GUI."""

    def __init__(self, window):
        """
        Constructor - defines all GUI elements.

        :param window: Tkinter root object.
        """

        # Create frames.
        self.input_frame = Frame(master=root, bg="#E0E9FF", width=1920, height=100, padx=1, pady=1)
        self.prediction_frame = Frame(master=root, bg="#E0E9FF", width=1920, height=400, padx=1, pady=1)
        self.data_frame = Frame(master=root, bg="#E0E9FF", width=1920, height=400, padx=1, pady=1)
        self.button_frame = Frame(master=root, bg="#E0E9FF", width=1920, padx=1, pady=1)

        # Place frames in grid layout.
        self.input_frame.grid(row=1, column=0, sticky="ew")
        self.prediction_frame.grid(row=2, column=0, sticky="ew")
        self.data_frame.grid(row=3, column=0, sticky="ew")
        self.button_frame.grid(row=4, column=0, sticky="ew")

        # Should frame shrink to wrap subordinate widgets?
        self.input_frame.grid_propagate(True)
        self.prediction_frame.grid_propagate(True)
        self.data_frame.grid_propagate(True)
        self.data_frame.grid_propagate(True)

        # Set weights.
        self.input_frame.grid_rowconfigure(0, weight=1)
        self.input_frame.grid_columnconfigure(0, weight=1)
        self.prediction_frame.grid_rowconfigure(0, weight=1)
        self.prediction_frame.grid_columnconfigure(0, weight=1)
        self.data_frame.grid_rowconfigure(0, weight=1)
        self.data_frame.grid_columnconfigure(0, weight=1)
        self.button_frame.grid_rowconfigure(0, weight=1)
        self.button_frame.grid_columnconfigure(0, weight=1)

        # Input text to model.
        self.input_text = StringVar(value="Enter input to model here...")
        self.input_text_area = Text(master=self.input_frame, bg="#E0E9FF", width=1920, height=10)
        self.input_text_area_scrollbar = Scrollbar(master=self.input_frame)

        self.input_text_area_scrollbar.config(command=self.input_text_area.yview)
        self.input_text_area.config(yscrollcommand=self.input_text_area_scrollbar.set)
        self.input_text_area_scrollbar.pack(side=RIGHT, fill=Y)
        self.input_text_area.pack(expand=YES, fill=BOTH)

        self.input_text_area.insert(1.0, self.input_text.get())

        # Output data from model.
        self.predicted_text = StringVar(value="Predicted text will appear here...")
        self.predicted_text_area = Text(master=self.prediction_frame, bg="#E0E9FF", width=1920, height=10)
        self.predicted_text_area_scrollbar = Scrollbar(master=self.prediction_frame)

        self.predicted_text_area_scrollbar.config(command=self.predicted_text_area.yview)
        self.predicted_text_area.config(yscrollcommand=self.predicted_text_area_scrollbar.set)
        self.predicted_text_area_scrollbar.pack(side=RIGHT, fill=Y)
        self.predicted_text_area.pack(expand=YES, fill=BOTH)

        self.predicted_text_area.insert(1.0, self.predicted_text.get())

        self.data_text = StringVar(value="Prediction data will appear here...")
        self.data_text_area = Text(master=self.data_frame, bg="#E0E9FF", width=1920, height=20)
        self.data_text_area_scrollbar = Scrollbar(master=self.data_frame)

        self.data_text_area_scrollbar.config(command=self.data_text_area.yview)
        self.data_text_area.config(yscrollcommand=self.data_text_area_scrollbar.set)
        self.data_text_area_scrollbar.pack(side=RIGHT, fill=Y)
        self.data_text_area.pack(expand=YES, fill=BOTH)

        self.data_text_area.insert(1.0, self.data_text.get())

        # Message Widget.
        # self.prediction_message_area = Message(master=self.prediction_frame, bg="#E0E9FF", width=1920, padx=1, pady=1,
        #                                        anchor="center", justify="left", relief="raised",
        #                                        textvariable=self.predicted_text)
        # self.prediction_message_area.pack(expand=YES, fill=BOTH)
        #
        #
        # self.data_message_area = Message(master=self.data_frame, bg="#E0E9FF", width=1920, padx=1, pady=1,
        #                                  anchor="center", justify="left", relief="raised",
        #                                  textvariable=self.data_text)
        # self.data_message_area.pack(expand=YES, fill=BOTH)

        # Buttons.
        self.predict_button = Button(self.button_frame, text='Generate Prediction', command=self.predict)
        self.predict_button.pack(side=LEFT)

        self.quit_button = Button(self.button_frame, text='Quit Program', command=window.destroy)
        self.quit_button.pack(side=RIGHT)

        self.string_var_2 = StringVar()
        self.message_label = Label(window, textvariable=self.string_var_2, width=40)

        # Change fonts.
        myFont = Font(family="Times New Roman", size=16)
        self.input_text_area.configure(font=myFont)
        self.predicted_text_area.configure(font=myFont)
        self.data_text_area.configure(font=myFont)
        self.predict_button.configure(font=myFont)
        self.quit_button.configure(font=myFont)

    def predict(self):
        """
        Callback method that obtains GPT-2 model prediction and associated data.
        Outputs predicted text to GUI.

        :return: None.
        """
        debug = 0
        self.predicted_text_area.delete(1.0, END)
        self.data_text_area.delete(1.0, END)

        # Call GPT-2 model and obtain prediction results/data.
        results = model.main(str(self.input_text_area.get("1.0", "end-1c")))

        output = results

        model_input = output["Model Input"]
        decoded_prediction = output["Decoded Prediction"]
        encoded_prediction = output["Encoded Prediction"]

        print(f"Model input: {model_input}")
        print(f"Encoded prediction: {encoded_prediction}")
        print(f"Decoded prediction: {decoded_prediction}")

        # Display the data in the message widget.
        self.predicted_text.set(f"Original model input: {model_input}\n\n"
                                f"Encoded prediction: {encoded_prediction}\n\n"
                                f"Decoded prediction: {decoded_prediction}")
        self.predicted_text_area.insert(1.0, self.predicted_text.get())
        # self.prediction_message_area.configure(textvariable=self.predicted_text)

        ####################################################################################

        print(f"Object length: {len(testDataDict)}")

        data_wrapper = {}
        data = {}
        counter = 0
        for i in range(0, len(output) - 4):
            myKey = "Token " + str(counter)
            myValue = output[myKey]
            data[myKey + " Encoded"] = myValue[0]
            data[myKey + " Decoded"] = myValue[1]
            data[myKey + " Encoded Choices"] = myValue[2][0]
            data[myKey + " Decoded Choices"] = myValue[3]
            data_wrapper[counter] = data

            # Append to display all data.
            self.data_text.set(self.data_text.get() + f"\n"
                               f"Token {counter}:\n"
                               f"Encoded token: {data[myKey + ' Encoded']}\n"
                               f"Decoded token: {data[myKey + ' Decoded']}\n"
                               f"Encoded token choices: {data[myKey + ' Encoded Choices']}\n"
                               f"Decoded token choices: {data[myKey + ' Decoded Choices']}\n"
                               )
            if debug:
                print(f"Encoded token: {data[myKey + ' Encoded']}")
                print(f"Decoded token: {data[myKey + ' Decoded']}")
                print(f"Encoded token choices: {data[myKey + ' Encoded Choices']}")
                print(f"Decoded token choices: {data[myKey + ' Decoded Choices']}")
            data = {}
            counter += 1

        if debug:
            for key, value in data_wrapper.items():
                print(f"Data wrapper key: {key}")
                print(f"Data wrapper value: {value}")

        # Display the data in the message widget.
        self.data_text_area.insert(1.0, self.data_text.get())
        # self.data_message_area.configure(textvariable=self.data_text)

        ####################################################################################

        # Convert data for use in visualization.
        restructured_data = []
        counter = 0
        for key, value in data_wrapper.items():
            restructured_data.append({"selected_token": value["Token " + str(counter) + " Decoded"],
                                      "token_choices": value["Token " + str(counter) + " Decoded Choices"]})
            counter += 1

        if debug:
            print(f"{restructured_data}")
            for element in restructured_data:
                print(f"Restructured Data Word: {element['selected_token']}")
                print(f"Restructured Data Tokens: {element['token_choices']}")


#####################################################################################################

if __name__ == '__main__':
    root = Tk()
    root.title('GPT-2 Text Prediction GUI')
    root.configure(background="#E0E9FF")
    root.geometry("1920x1080")  # Set specific window size.
    # root.grid_rowconfigure(0, weight=1)
    root.grid_columnconfigure(0, weight=1)
    App(root)
    root.mainloop()
