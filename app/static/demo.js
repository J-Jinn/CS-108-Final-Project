/*
demo.js is the javascript file for demo.html

Course: CS-108
Instructor: Professor Keith VanderLinden
Student: Joseph Jinn
Date: 11-01-20
 */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Global variables.
const demo = {};
let saveJsonObject;

const testDataDict = {
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Call the init function once web page is ready.
 */
$(document).ready(function () {
    demo.init();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Initialization function.
 */
demo.init = () => {
    // Bind functions to event handlers.
    $('#generate-button').bind('click', demo.generate);

    // Setup canvas for output.
    demo.canvas = $('#output-canvas')[0];
    demo.context = demo.canvas.getContext('2d');
    demo.canvas.width = 3840;
    demo.canvas.height = 240;

    // Setup textarea for input.
    demo.textArea = $('#input-text-area')[0];
    demo.textArea.rows = 10;
    demo.textArea.cols = 250;

    // Test import data.
    // demo.importTestDataset();

    // Test draw visualization_concept.
    demo.drawVisualization(testDataDict);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let inputText = '';

/**
 * Generate prediction and visualize results.
 */
demo.generate = () => {
    inputText = demo.getInputText();

    // POST the user input text to the web server.
    fetch('/getInputTextForVisualizationDemo', {
        // Specify the method.
        method: 'POST',
        // Specify type of payload.
        headers: {
            'Content-Type': 'application/json'
        },
        // A JSON payload.
        body:
            JSON.stringify({"user_input_text": inputText})
    }).then(function (response) {
        // Wait for the web server to return the results.
        return response.text();
    }).then(function (jsonObj) {
        // Output the returned data.
        console.log(`From Flask/Python: ${jsonObj}`);
        demo.drawVisualization(jsonObj);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Get user input text.
 * @return string
 */
demo.getInputText = () => {
    return $('#input-text-area').val();
};

/**
 * Output text prediction results to canvas object.
 */
demo.outputResults = (encoded, decoded) => {
    debug = true;

    if (debug) {
        console.log(`Encoded prediction to display: ${encoded}`);
        console.log(`Decoded prediction to display: ${decoded}`);   
    }
    demo.context.clearRect(0, 0, demo.canvas.width, demo.canvas.height);
    demo.context.fillStyle = "#27cd51";
    demo.context.font = "italic bold 24px/30px Georgia, serif";
    demo.context.fillText("Encoded Prediction (token IDs):", 10, 30);
    demo.context.fillText(encoded, 10, 60);
    demo.context.fillText("Decoded Prediction (text):", 10, 100);
    demo.context.fillText(decoded, 10, 130);

    // let my_svg2 = d3.selectAll('svg#output-svg');
    // my_svg2.selectAll("*").remove(); // Clear SVG.
    // my_svg2.attr('width', 3840)
    //     .attr('height', 240)
    //     .style('background-color', '#181e3f');
    //
    // let my_g = my_svg2.selectAll('g')
    //     .data(output)
    //     .enter()
    //     .append('g');
    //
    // my_g.append('rect')
    //     .attr('width', 3840)
    //     .attr('height', 240)
    //     .attr('fill', '#39133f');
    //
    // my_g.selectAll('text')
    //     .data(output)
    //     .enter()
    //     .append('text')
    //     .attr("font-size", "10em")
    //     // .text(function(d) {return d})
    //     .text("hello, this is a test!")
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Function to process imported data.
 *
 * @param data
 * @returns {undefined}
 */
function processData(data) {
    // Do something.
    return undefined;
}

demo.importTestDataset = () => {
    /**
     * Function import the data.
     */
    // noinspection SpellCheckingInspection
    d3.csv("../static/files/next_token_logits_test.csv").then(function (data) {
        processData(data);
    }).catch(function (error) {
        console.log(error);
        console.log('Failed to import data.');
    });
    d3.selectAll('svg#visualization_concept');
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Function to process and visualization_concept GPT2-model predicted text.
 *
 * @param output - JSON response object.
 */
demo.drawVisualization = (output) => {

    // if (debug) {
    //     console.log(`Output variable:\n${output}`);
    //     console.log(`Output variable is of type: ${typeof output}`);
    //
    //     // Convert test data from GPT2-model into a JSON object as expected of Flask response.
    //     let jsonOutput = JSON.stringify(output);
    //     console.log(`JSON object:\n${jsonOutput}`);
    //     console.log(`JSON object type is: ${typeof jsonOutput}`);
    //
    //     // Convert JSON object into a Javascript object.
    //     let jsonOutputParsed = JSON.parse(jsonOutput);
    //     console.log(`JSON object parsed:\n${jsonOutputParsed}`);
    //     console.log(`JSON object parsed type is: ${typeof jsonOutputParsed}`);
    // }
    
//     output = JSON.parse(output); // Derp, convert string to Javascript object first. (disable when testing)

    let debug = true;
    let model_input = output["Model Input"];
    let decoded_prediction = output["Decoded Prediction"];
    let encoded_prediction = output["Encoded Prediction"];

    console.log(`Model Input: ${model_input}`);
    console.log(`Encoded prediction: ${encoded_prediction}`);
    console.log(`Decoded prediction: ${decoded_prediction}`);

    let objectLength = Object.keys(output).length
    if (debug) {
        console.log(`Object length: ${objectLength}`);   
    }

    let data_wrapper = {};
    let data = {};
    for (let item = 0; item <= objectLength - 4; item++) {

        let myKey = "Token " + item;
        let myValue = output[myKey];
        data[myKey + " Encoded"] = myValue[0];
        data[myKey + " Decoded"] = myValue[1];
        data[myKey + " Encoded Choices"] = myValue[2][0];
        data[myKey + " Decoded Choices"] = myValue[3];
        data_wrapper[item] = data;
        if (debug) {
            console.log(`Encoded token: ${data[myKey + " Encoded"]}`);
            console.log(`Decoded token: ${data[myKey + " Decoded"]}`);
            console.log(`Encoded token choices: ${data[myKey + " Encoded Choices"]}`);
            console.log(`Decoded token choices: ${data[myKey + " Decoded Choices"]}`);
        }
        data = {};
    }
    if (debug) {
        Object.entries(data_wrapper).forEach(([key, value]) => {
            console.log(key);
            console.log(value);
        })
    }

    // Output the prediction to canvas element.
    demo.outputResults(encoded_prediction, decoded_prediction);

    // Convert data for use in D3.
    let restructureData = [];
    let counter = 0;
    Object.entries(data_wrapper).forEach(([key, value]) => {
        restructureData.push({"selected_token": value["Token " + counter + " Decoded"], "token_choices": value["Token " + counter + " Decoded Choices"]});
        counter++;
    })
    if (debug) {
        console.log(restructureData);
        for (let i = 0; i < restructureData.length; i++) {
            console.log(`Restructured Data Word:\n ${restructureData[i].selected_token}`);
            console.log(`Restructured Data Tokens:\n ${restructureData[i].token_choices}`);
        }
    }

    let getSelectedText = "";
    let inputTokens = [];
    let inputString = model_input;

    // TODO - dynamic resizing of svg width based on the length of the predicted text and its tokens.
    let my_svg = d3.selectAll('svg#visualization-svg');  // select the svg element
    // https://stackoverflow.com/questions/10784018/how-can-i-remove-or-replace-svg-content
    my_svg.selectAll("*").remove(); // Permits re-draw for each iteration.
    my_svg.attr('width', 3840)
        .attr('height', 240)
        .selectAll('g')  // new selection starts here (and is empty for now)
        .data(restructureData)
        .enter()
        .append('g')     // selection now has n 'g' elements, one for each selected_token
        .style('transform', (d, i) => 'translate(' + (i * 100) + 'px, 50px)')
        .selectAll('text')
        .data(d => (d.token_choices || []).map(selected_token => ({
            selected_token: selected_token,
            matchesParent: selected_token === d.selected_token
        })))
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('y', (d, i) => i * 20)
        .text(d => d.selected_token)
        .style('fill', d => d.matchesParent ? 'red' : '#00a515')
        .on('mouseover', function (d, i) {
            console.log("mouseover on", this);
            d3.select(this)
                .style('fill', '#ffaf53');
        })
        .on('mouseout', function (d, i) {
            console.log("mouseout", this);
            d3.select(this)
                .style('fill', d => d.matchesParent ? 'red' : '#00a515');
        })
        .on('click', function (d, i) {
            console.log("clicking on", this);
            getSelectedText = d3.select(this).text();
            console.log(getSelectedText);

            // Ghetto way of constructing the tokens we want to send back to the GPT-2 model.
            // https://stackoverflow.com/questions/1564818/how-to-break-nested-loops-in-javascript/1564838
            (function () {
                // for (let key in tokenLists) {
                //     console.log(`key: ${key}`);
                //     for (let value = 0; value < tokenLists[key].length; value++) {
                //         if (tokenLists[key][value] === getSelectedText) {
                //             inputTokens.push(getSelectedText);
                //             inputString = inputString.concat(getSelectedText);
                //             return;
                //         }
                //     }
                //     inputTokens.push(key);
                //     // FIXME - not saving the first token...
                //     inputString = inputString.concat(key);
                // }
                
                // FIXME: this isn't working as intended at the moment.

                Object.entries(data_wrapper).forEach(([key, value]) => {

                    for (let counter = 0; counter < value["Token " + key + " Decoded Choices"].length; counter++) {
                        if (value["Token " + key + " Decoded Choices"][counter] === getSelectedText) {
                            inputTokens.push(getSelectedText);
                            inputString = inputString.concat(getSelectedText);
                            return;
                        }
                    }
                    inputTokens.push(value["Token " + key + " Decoded"]);
                    // FIXME - not saving the first token...
                    inputString = inputString.concat(value["Token " + key + " Decoded"]);
                })

//                 for (let key in myDict) {
//                     console.log(`key: ${key}`);
//                     for (let value = 0; value < myDict[key].length; value++) {
//                         if (myDict[key][value] === getSelectedText) {
//                             inputTokens.push(getSelectedText);
//                             inputString = inputString.concat(getSelectedText);
//                             return;
//                         }
//                     }
//                     inputTokens.push(key);
//                     // FIXME - not saving the first token...
//                     inputString = inputString.concat(key);
//                 }

            })();
            console.log(`New input tokens (excluding original input to model): ${inputTokens}`);
            console.log(`New input string to model: ${inputString}`);

            // POST the user input text to the web server.
            fetch('/getInputTextForVisualizationDemo', {
                // Specify the method.
                method: 'POST',
                // Specify type of payload.
                headers: {
                    'Content-Type': 'application/json'
                },
                // A JSON payload.
                body:
                    JSON.stringify({"user_input_text": inputString})
            }).then(function (response) {
                // Wait for the web server to return the results.
                return response.text();
            }).then(function (jsonObj) {
                // Output the returned data.
                console.log(`From Flask/Python: ${jsonObj}`);
                saveJsonObject = jsonObj;
            });
            // Clear for next selection and prediction.
            inputTokens = [];
            inputString = "";
            console.log(`saved json object: ${saveJsonObject}`);
            demo.drawVisualization(saveJsonObject);
        });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////