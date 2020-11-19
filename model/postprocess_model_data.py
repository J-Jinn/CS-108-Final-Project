"""
postprocess_model_data.py is for testing how to process GPT-2 results for use in data visualization(s).

Course: CS-108 Intro to Computing
Instructor: Professor Keith VanderLinden
Student: Joseph Jinn
Date: 11-20-20
"""

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

if __name__ == "__main__":
    output = testDataDict

    debug = 1

    model_input = output["Model Input"]
    decoded_prediction = output["Decoded Prediction"]
    encoded_prediction = output["Encoded Prediction"]

    print(f"Model input: {model_input}")
    print(f"Encoded prediction: {encoded_prediction}")
    print(f"Decoded prediction: {decoded_prediction}")

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
