/*
demo.js is the javascript file for demo.html

Course: CS-108
Instructor: Professor Keith VanderLinden
Student: Joseph Jinn
Date: 11-15-20

Note: Right-click refresh icon - hard-reload and/or empty cache and hard reload.
CTR-R = normal reload, CTRL-SHIFT-R = hard reload.

https://dev.to/praneetnadkar/using-reload-options-in-chrome-3cgn

 */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Global variables.
const demo = {};
let saveJsonObject;

const testDataDict = {
    'Model Input': 'hello, I am',
    'Encoded Prediction': [31373, 11, 314, 716, 18259, 351, 257, 20027, 422, 465, 15807, 13, 198, 198, 1544, 4005, 306, 11, 360, 5948, 8248, 0, 50256],
    'Decoded Prediction': 'hello, I am blessed with a blessing from his fortune.\n\nHeavenly, DyeStar!<|endoftext|>',
    'Token 0': [18259, ' blessed', [[18259, 3597, 262, 287, 1654, 2491, 691, 1541, 994, 523]], [' blessed', ' writing', ' the', ' in', ' sure', ' running', ' only', ' already', ' here', ' so'], [-65.53915405273438, -65.97432708740234, -66.75447082519531, -66.90670776367188, -67.00700378417969, -67.11404418945312, -67.2993392944336, -67.38185119628906, -67.42356872558594, -67.50601959228516], [0.13013789057731628, 0.0842190831899643, 0.03860098496079445, 0.03314993903040886, 0.02998642809689045, 0.026942485943436623, 0.022385409101843834, 0.02061249315738678, 0.01977028138935566, 0.01820559613406658]],
    'Token 1': [351, ' with', [[351, 290, 11, 13, 284, 326, 416, 329, 287, 7]], [' with', ' and', ',', '.', ' to', ' that', ' by', ' for', ' in', '('], [-40.615047454833984, -41.28554153442383, -42.51679611206055, -42.62409973144531, -43.177032470703125, -43.21555709838867, -43.60599136352539, -44.148460388183594, -44.61507034301758], [0.4892304837703705, 0.25021979212760925, 0.07304568588733673, 0.06561350077390671, 0.03774483501911163, 0.03631838411092758, 0.024578934535384178, 0.014288011007010937, 0.008960364386439323]],
    'Token 2': [257, ' a', [[257, 262, 35000, 2818, 1037, 340, 790, 428, 477, 617]], [' a', ' the', ' riches', ' perfect', ' help', ' it', ' every', ' this', ' all', ' some'], [-50.08485412597656, -50.19130325317383, -51.79832458496094, -52.14579772949219, -52.20835876464844, -52.334815979003906, -52.46378707885742, -52.80924987792969, -52.91110610961914, -53.06926345825195], [0.2715603709220886, 0.2441384196281433, 0.048945825546979904, 0.034578803926706314, 0.03248179703950882, 0.028623344376683235, 0.02515990100800991, 0.017810510471463203, 0.016085729002952576, 0.013732635416090488]],
    'Token 3': [20027, ' blessing', [[20027, 14297, 1029, 2802, 922, 13, 14431, 4508, 14628, 1363]], [' blessing', ' skilled', ' high', ' mother', ' good', '.', ' generous', ' brand', ' Happy', ' home'], [-63.2545051574707, -63.2683219909668, -63.4168815612793, -63.71054458618164, -63.854225158691406, -63.92293167114258, -63.93888473510742, -64.58235931396484, -64.61076354980469, -64.72954559326172], [0.05110841989517212, 0.05040711909532547, 0.043448347598314285, 0.03239194676280022, 0.02805675007402897, 0.026193799450993538, 0.02577924355864525, 0.0135460514575243, 0.013166699558496475, 0.011692047119140625]],
    'Token 4': [422, ' from', [[422, 13, 290, 526, 11, 284, 329, 287, 355, 326]], [' from', '.', ' and', '."', ',', ' to', ' for', ' in', ' as', ' that'], [-52.53756332397461, -53.226097106933594, -53.848793029785156, -53.90347671508789, -54.20323944091797, -54.45066833496094, -54.47257995605469, -54.70341491699219, -54.876590728759766, -56.02408981323242], [0.3514757752418518, 0.1765505075454712, 0.09471866488456726, 0.08967816829681396, 0.06645099073648453, 0.05188531056046486, 0.05076078698039055, 0.0402974896132946, 0.0338897742331028, 0.010757619515061378]],
    'Token 5': [465, ' his', [[465, 616, 262, 5783, 1793, 968, 17371, 7439, 19010, 8706]], [' his', ' my', ' the', ' Hell', ' God', ' New', ' Gabriel', ' Holy', ' Moses', ' Mars'], [-48.207801818847656, -48.526336669921875, -48.73501205444336, -50.79938507080078, -51.14302444458008, -51.48191452026367, -51.80183029174805, -52.01506805419922, -52.131263732910156, -52.16857147216797], [0.3110648989677429, 0.22621066868305206, 0.1836058646440506, 0.023299183696508408, 0.016523422673344612, 0.011773942969739437, 0.008550357073545456, 0.00690838135778904, 0.006150538567453623, 0.005925303790718317]],
    'Token 6': [15807, ' fortune', [[15807, 14442, 2988, 3988, 4082, 13626, 4380, 7710, 4453, 3985]], [' fortune', ' loving', ' father', ' kids', ' birth', ' sacred', ' People', ' Spirit', ' Lord', ' coach'], [-63.37057876586914, -64.135986328125, -64.30474853515625, -64.58769989013672, -64.77904510498047, -64.94889068603516, -65.11905670166016, -65.13370513916016, -65.19256591796875, -65.2494888305664], [0.10777418315410614, 0.05013054609298706, 0.04234576225280762, 0.03190992400050163, 0.02635272778570652, 0.022236302495002747, 0.018756872043013573, 0.018484115600585938, 0.017427528277039528, 0.016463208943605423]],
    'Token 7': [13, '.', [[13, 0, 290, 11, 526, 553, 326, 986, 25, 198]], ['.', '!', ' and', ',', '."', ',"', ' that', '...', ':', '\n'], [-53.41785430908203, -54.26845169067383, -54.4417610168457, -55.97113800048828, -56.00495529174805, -56.23847198486328, -56.24660110473633, -56.93913269042969, -56.96028137207031, -57.07298278808594], [0.4343065321445465, 0.18551823496818542, 0.1559981107711792, 0.03380020335316658, 0.03267628699541092, 0.025871263816952705, 0.025661807507276535, 0.012838805094361305, 0.012570131570100784, 0.011230374686419964]],
    'Token 8': [198, '\n', [[198, 554, 447, 679, 843, 314, 383, 770, 317, 11136]], ['\n', ' In', '�', ' He', ' And', ' I', ' The', ' This', ' A', ' Having'], [-67.567626953125, -68.1595230102539, -68.6553726196289, -69.1773910522461, -69.53514099121094, -69.84938049316406, -70.06022644042969, -70.1200180053711, -70.29590606689453, -70.49251556396484], [0.2799011766910553, 0.15486295521259308, 0.09431978315114975, 0.055961981415748596, 0.039131298661231995, 0.028579311445355415, 0.02314634993672371, 0.021802956238389015, 0.01828639768064022, 0.01502248365432024]],
    'Token 9': [198, '\n', [[198, 4342, 1026, 40, 2514, 5962, 1639, 1870, 10449, 464]], ['\n', 'Here', 'It', 'I', 'To', 'First', 'You', 'And', 'Thank', 'The'], [-43.57559585571289, -45.170074462890625, -46.0606803894043, -46.76148986816406, -46.84958267211914, -46.98122024536133, -47.03620147705078, -47.06201171875, -47.228492736816406, -47.237606048583984], [0.5504280924797058, 0.11174479871988297, 0.04586084932088852, 0.022755397483706474, 0.020836567506194115, 0.01826655864715576, 0.017289351671934128, 0.016848817467689514, 0.014264863915741444, 0.014135454781353474]],
    'Token 10': [1544, 'He', [[1544, 3198, 464, 198, 10248, 7, 37, 5756, 32, 2514]], ['He', 'One', 'The', '\n', 'Good', '(', 'F', 'Let', 'A', 'To'], [-39.37452697753906, -40.14228057861328, -40.96382522583008, -41.373046875, -41.59981155395508, -41.81736373901367, -41.8245849609375, -41.98220443725586, -42.032894134521484, -42.03313064575195], [0.2698129117488861, 0.12520785629749298, 0.055060386657714844, 0.03656929358839989, 0.02914968691766262, 0.02345050685107708, 0.023281775414943695, 0.01988670416176319, 0.01890377514064312, 0.018899304792284966]],
    'Token 11': [4005, 'aven', [[4005, 373, 1908, 318, 290, 973, 393, 750, 531, 635]], ['aven', ' was', ' sent', ' is', ' and', ' used', ' or', ' did', ' said', ' also'], [-58.06147003173828, -58.3227653503418, -58.72197723388672, -58.8929328918457, -59.831844329833984, -59.905086517333984, -60.275238037109375, -60.30933380126953, -60.33329772949219, -60.3868408203125], [0.15311197936534882, 0.1179044097661972, 0.0790959969162941, 0.06666677445173264, 0.026070261374115944, 0.02422906830906868, 0.016733312979340553, 0.016172396019101143, 0.015789447352290154, 0.014966266229748726]],
    'Token 12': [306, 'ly', [[306, 12, 2925, 0, 262, 11, 314, 339, 338, 414]], ['ly', '-', ' goes', '!', ' the', ',', ' I', ' he', "'s", 'ity'], [-40.69231414794922, -40.85542297363281, -42.22315216064453, -42.52754211425781, -42.59046173095703, -42.70576477050781, -42.70740509033203, -42.878753662109375, -43.12389373779297, -43.18714904785156], [0.2265848070383072, 0.19248351454734802, 0.04902259260416031, 0.036157749593257904, 0.03395281359553337, 0.030255218967795372, 0.030205629765987396, 0.025449085980653763, 0.019916323944926262, 0.0186955276876688]],
    'Token 13': [11, ',', [[11, 347, 29561, 1178, 15921, 5830, 23076, 11023, 6062, 3334]], [',', ' B', ' treasures', ' few', ' fruits', ' Death', ' Pine', ' Hal', ' Enter', ' High'], [-52.87582778930664, -54.703609466552734, -54.804290771484375, -54.971275329589844, -54.99006652832031, -55.657711029052734, -55.66981887817383, -55.69477844238281, -55.70657730102539, -55.78520584106445], [0.18496128916740417, 0.029736191034317017, 0.02688809484243393, 0.022753046825528145, 0.022329479455947876, 0.011453133076429367, 0.011315296404063702, 0.011036367155611515, 0.010906916111707687, 0.010082169435918331]],
    'Token 14': [360, ' D', [[360, 314, 481, 5899, 739, 645, 339, 262, 356, 484]], [' D', ' I', ' will', ' pure', ' under', ' no', ' he', ' the', ' we', ' they'], [-56.5599479675293, -57.20552062988281, -57.863895416259766, -58.42173767089844, -58.522674560546875, -58.74357604980469, -58.96034240722656, -58.99882888793945, -59.03498840332031, -59.13947677612305], [0.21221837401390076, 0.11127927899360657, 0.05760839954018593, 0.03297751769423485, 0.029811352491378784, 0.023902611806988716, 0.019244424998760223, 0.01851784437894821, 0.017860211431980133, 0.0160882156342268]],
    'Token 15': [5948, 'ye', [[5948, 5799, 5, 13865, 26673, 12, 14992, 13, 33134, 1940]], ['ye', 'ora', '&', 'azed', 'enton', '-', 'rying', '.', 'andel', 'ald'], [-35.09757614135742, -37.09654235839844, -37.11943435668945, -37.25136947631836, -37.569156646728516, -37.661048889160156, -37.721309661865234, -37.91007614135742, -37.92487716674805, -37.929412841796875], [0.1772707849740982, 0.02401580661535263, 0.02347227931022644, 0.020571056753396988, 0.014970744960010052, 0.013656364753842354, 0.012857726775109768, 0.010645938105881214, 0.010489528067409992, 0.010442058555781841]],
    'Token 16': [8248, 'Star', [[8248, 468, 261, 11, 13, 373, 8873, 0, 50256, 262]], ['Star', ' has', 'on', ',', '.', ' was', 'ho', '!', '<|endoftext|>', ' the'], [-48.038429260253906, -49.127479553222656, -49.368492126464844, -49.834415435791016, -49.838253021240234, -50.19730758666992, -50.24956512451172, -51.11033248901367, -51.279972076416016, -51.296146392822266], [0.23287150263786316, 0.0783696323633194, 0.06158534437417984, 0.03864821791648865, 0.038500186055898666, 0.026886073872447014, 0.02551715448498726, 0.010789609514176846, 0.00910609494894743, 0.008959995582699776]],
    'Token 17': [0, '!', [[0, 13, 350, 13980, 5436, 2779, 2254, 318, 11, 843]], ['!', '.', ' P', ' Grey', ' Max', ' base', ' City', ' is', ',', ' And'], [-46.9754753112793, -47.175445556640625, -47.58201599121094, -47.815303802490234, -48.03987121582031, -48.470645904541016, -48.79129409790039, -48.80998992919922, -48.938987731933594, -49.30420684814453], [0.1301662027835846, 0.10657424479722977, 0.07097100466489792, 0.05620375648140907, 0.04489903151988983, 0.029184609651565552, 0.02117864415049553, 0.02078636921942234, 0.018270717933773994, 0.012680692598223686]]
}

const testDataDict2 = {
    'Encoded Text': [5756, 338, 1332, 428, 0],
    'Encoded Text Tokens': [[5756], [338], [1332], [428], [0]],
    'Decoded Text': "Let's test this!",
    'Decoded Text Tokens': ['Let', "'s", ' test', ' this', '!']
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
    $('#generate-button-2').bind('click', demo.generate2);

    // Setup canvas for output.
    // demo.canvas = $('#output-canvas')[0];
    // demo.context = demo.canvas.getContext('2d');
    // demo.canvas.width = 3840;
    // demo.canvas.height = 240;

    // Setup textarea for input.
    demo.textArea = $('#input-text-area')[0];
    demo.textArea.rows = 10;
    demo.textArea.cols = 250;

    demo.textArea2 = $('#input-text-area-2')[0];
    demo.textArea2.rows = 10;
    demo.textArea2.cols = 250;

    // Test import data.
    // demo.importTestDataset();

    // Test draw visualization_concept.
    // demo.drawVisualization(testDataDict);
    // demo.drawVisualization2(testDataDict2);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let inputText = '';

/**
 * Generate prediction and visualize results.
 */
demo.generate = () => {
    let debug = 0;
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
        if (debug === 1) {
            console.log(`From Flask/Python: ${jsonObj}`);
        }
        // Call function to process data and draw visualization once we have the results.
        demo.drawVisualization(jsonObj);
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Visualize results for encoding/decoding words/sentences.
 */
demo.generate2 = () => {
    let debug = 0;
    inputText = demo.getInputText2();

    // POST the user input text to the web server.
    fetch('/encodeDecodeTokensForVisualizationDemo', {
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
        if (debug === 1) {
            console.log(`From Flask/Python: ${jsonObj}`);
        }
        // Call function to process data and draw visualization once we have the results.
        // demo.processData(jsonObj);
        demo.drawVisualization2(jsonObj);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Function to get user input text for generating predictions.
 *
 * @return string: return user input as a string.
 */
demo.getInputText = () => {
    return $('#input-text-area').val();
};

/**
 * Function to get user input text for encoding/decoding words.
 *
 * @return string: return user input as a string.
 */
demo.getInputText2 = () => {
    return $('#input-text-area-2').val();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Output text prediction results to svg object.
 *
 * @param encoded: encoded prediction text string.
 * @param decoded: decoded prediction text string.
 */
demo.outputResults = (encoded, decoded) => {
    let debug = 0;
    if (debug === 1) {
        console.log(`Encoded prediction to display: ${encoded}`);
        console.log(`Decoded prediction to display: ${decoded}`);
    }
    // demo.context.clearRect(0, 0, demo.canvas.width, demo.canvas.height);
    // demo.context.fillStyle = "#27cd51";
    // demo.context.font = "italic bold 24px/30px Georgia, serif";
    // demo.context.fillText("Encoded Prediction (token IDs):", 10, 30);
    // demo.context.fillText(encoded, 10, 60);
    // demo.context.fillText("Decoded Prediction (text):", 10, 100);
    // demo.context.fillText(decoded, 10, 130);

    my_data = ["Encoded Prediction (token IDs):", encoded.toString(),
        "Decoded Prediction (text):", decoded];

    if (debug) {
        console.log(my_data);
        console.log(my_data[1]);
    }

    let my_svg = d3.selectAll('svg#output-svg');  // select the svg element
    my_svg.selectAll("*").remove(); // Permits re-draw for each iteration.
    my_svg.attr('width', decoded.length * 12)
        .attr('height', my_data.length * 27)
        .selectAll('g') // new selection starts here (and is empty for now)
        .data(my_data)
        .enter()
        .append('g') // selection now has n 'g' elements, one for each selected_token
        .style('transform', (d, i) => 'translate(' + (i * 0) + 'px, 25px)') // determine position of each "g" element.
        .selectAll('text') // new selection for text of each 'g' element.
        .data(my_data)
        .enter()
        .append('text')
        .attr('font-size', '24px')
        .attr('x', 0)
        .attr('y', (d, i) => i * 20)
        .text(d => {
            return d;
        })
        .style('fill', 'red')

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


/**
 * Output word token scores and probabilities to svg object.
 *
 * @param data: necessary data to display selected tokens, alternative token choices, scores, and probabilities.
 */
demo.outputResults2 = (data) => {
    let debug = 0
    // Convert data for use in D3.
    let restructureData = [];
    let counter = 0;
    Object.entries(data).forEach(([key, value]) => {
        restructureData.push({
            "selected_token": value["Token " + counter + " Decoded"],
            "token_choices": value["Token " + counter + " Decoded Choices"],
            "top10_log_scores": value["Token " + counter + " Log Scores"],
            "top10_probabilities": value["Token " + counter + " Probabilities"]
        });
        counter++;
    })
    if (debug === 1) {
        console.log(restructureData);
        for (let i = 0; i < restructureData.length; i++) {
            console.log(`Selected Token:\n ${restructureData[i].selected_token}`);
            console.log(`Alternative Choicess:\n ${restructureData[i].token_choices}`);
            console.log(`Top 10 Highest Log Scores:\n ${restructureData[i].top10_log_scores}`);
            console.log(`Top 10 Highest Probabilities:\n ${restructureData[i].top10_probabilities}`);
        }
    }

    let my_svg = d3.selectAll('svg#output-svg-2');  // select the svg element
    my_svg.selectAll("*").remove(); // Permits re-draw for each iteration.
    my_svg.attr('width', restructureData[0].top10_probabilities.toString().length * 19)
        .attr('height', my_data.length * 57 * 21)

    display_data = [];
    display_data.push("If using top_k_top_p_filtering(scores, top_k=top_k, top_p=top_p)() instead of " +
        "torch.multinomial(probs, num_samples=10) scores and probabilities would correspond to the N alternative " +
        "token choices (not necessarily in listed order at the moment).  But, currently using multinomial so " +
        "alternative N token choices don't necessarily correspond to the displayed top N highest " +
        "scores/probabilities.");
    display_data.push("TODO: Figure out how to intercept the log-scores/probabilities chosen when using " +
        "torch.multinomial()");
    display_data.push("FIXME: Display issues with certain characters (Unicode?)")
    for (let i = 0; i < restructureData.length; i++) {
        display_data.push("");
        display_data.push("Selected Token " + i + " for Prediction:", "\"" +
            restructureData[i].selected_token.toString() + "\"");
        display_data.push("Alternative Choices:", restructureData[i].token_choices.toString());
        display_data.push("Top 10 Highest Log Scores for Iteration:",
            restructureData[i].top10_log_scores.toString());
        display_data.push("Top 10 Highest Probabilities for Iteration:",
            restructureData[i].top10_probabilities.toString());
    }

    // my_data = ["Selected Token " + i + " for Prediction:", restructureData[i].selected_token.toString(),
    // "Alternative Choices:", restructureData[i].token_choices.toString(),
    // "Top 10 Highest Log Scores for Iteration:", restructureData[i].top10_log_scores.toString(),
    // "Top 10 Highest Probabilities: for Iteration", restructureData[i].top10_probabilities.toString()];

    my_svg.selectAll('g') // new selection starts here (and is empty for now)
        .data(display_data)
        .enter()
        .append('g') // selection now has n 'g' elements, one for each selected_token
        .style('transform', (d, i) => 'translate(' + (i * 0) + 'px, 25px)') // determine position of each "g" element.
        .selectAll('text') // new selection for text of each 'g' element.
        .data(display_data)
        .enter()
        .append('text')
        .attr('font-size', '24px')
        .attr('x', 0)
        .attr('y', (d, i) => i * 25)
        .text(d => {
            return d;
        })
        .style('fill', '#00a515')
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Deprecated.
 * Function to test importing data via GET with Flask framework.
 */
demo.importTestDataset = () => {
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
 * Function to implement node.js and other packages to communicate with database back-end.
 * TODO: implement.
 *
 * @param output
 */
demo.sqlQueries = (output) => {
    // Do something.
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Function to process to process the data returned by the GPT2-model.
 *
 * @param output: JSON object sent to front-end via Flask framework containing GPT2-model data.
 * @returns return_data: processed data for visualization using d3.js.
 */
demo.processData = (output) => {
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

    output = JSON.parse(output); // Derp, convert string to Javascript object first. (disable when testing)

    let debug = 0;
    let model_input = output["Model Input"];
    let decoded_prediction = output["Decoded Prediction"];
    let encoded_prediction = output["Encoded Prediction"];

    console.log(`Model Input: ${model_input}`);
    console.log(`Encoded prediction: ${encoded_prediction}`);
    console.log(`Decoded prediction: ${decoded_prediction}`);

    let objectLength = Object.keys(output).length;
    if (debug === 1) {
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
        data[myKey + " Log Scores"] = myValue[4];
        data[myKey + " Probabilities"] = myValue[5];
        data_wrapper[item] = data;
        if (debug === 1) {
            console.log(`Encoded token: ${data[myKey + " Encoded"]}`);
            console.log(`Decoded token: ${data[myKey + " Decoded"]}`);
            console.log(`Encoded token choices: ${data[myKey + " Encoded Choices"]}`);
            console.log(`Decoded token choices: ${data[myKey + " Decoded Choices"]}`);
            console.log(`Top 10 Highest Log Scores: ${data[myKey + " Log Scores"]}`);
            console.log(`Top 10 Highest Probabilities: ${data[myKey + " Probabilities"]}`);
        }
        data = {};
    }
    if (debug === 1) {
        Object.entries(data_wrapper).forEach(([key, value]) => {
            console.log(`Data wrapper key: ${key}`);
            console.log(`Data wrapper value: ${value}`);
        })
    }

    // Output the prediction to svg element.
    demo.outputResults(encoded_prediction, decoded_prediction);

    // Output prediction word tokens and associated data to svg element.
    demo.outputResults2(data_wrapper);

    // Save results to the database.
    demo.sqlQueries(model_input);

    // Convert data for use in D3.
    let restructureData = [];
    let counter = 0;
    Object.entries(data_wrapper).forEach(([key, value]) => {
        restructureData.push({
            "selected_token": value["Token " + counter + " Decoded"],
            "token_choices": value["Token " + counter + " Decoded Choices"],
        });
        counter++;
    })
    if (debug === 1) {
        console.log(restructureData);
        for (let i = 0; i < restructureData.length; i++) {
            console.log(`Restructured Data Word:\n ${restructureData[i].selected_token}`);
            console.log(`Restructured Data Tokens:\n ${restructureData[i].token_choices}`);
        }
    }

    let return_data = [];
    return_data.push(model_input);
    return_data.push(data_wrapper);
    return_data.push(restructureData);
    return return_data;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Function to process the data returned by the GPT2-model's tokenizer.
 *
 * @param output: JSON object sent to front-end via Flask framework containing GPT2-model data.
 * @returns return_data: processed data for visualization using d3.js.
 */
demo.processData2 = (output) => {
    output = JSON.parse(output); // Derp, convert string to Javascript object first. (disable when testing)

    let debug = 0;
    let encoded_text = output["Encoded Text"];
    let encoded_text_tokens = output["Encoded Text Tokens"];
    let decoded_text = output["Decoded Text"];
    let decoded_text_tokens = output["Decoded Text Tokens"];

    console.log(`Encoded Text: ${encoded_text}`);
    console.log(`Encoded Text Tokens: ${encoded_text_tokens}`);
    console.log(`Decoded Text: ${decoded_text}`);
    console.log(`Decoded Text Tokens: ${decoded_text_tokens}`);

    // Convert data for use in D3.
    let restructureData = [];
    let counter = 0;

    while (counter < encoded_text_tokens.length) {
        restructureData.push({
            "selected_token": encoded_text_tokens[counter],
            "token_choices": [decoded_text_tokens[counter]]
        })
        counter++;
    }

    if (debug === 1) {
        console.log(restructureData);
        for (let i = 0; i < restructureData.length; i++) {
            console.log(`Restructured Data Word:\n ${restructureData[i].selected_token}`);
            console.log(`Restructured Data Tokens:\n ${restructureData[i].token_choices}`);
        }
    }
    return restructureData;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Function to visualize the GPT2-model's predicted text.
 *
 * @param output: JSON response object.
 */
demo.drawVisualization = (output) => {
    let debug = 0;
    let processed = demo.processData(output);
    let model_input = processed[0];
    let data_wrapper = processed[1];
    let restructureData = processed[2];

    let getSelectedText = "";
    let inputTokens = [];
    let inputString = model_input;

    let my_svg = d3.selectAll('svg#visualization-svg');  // select the svg element
    // https://stackoverflow.com/questions/10784018/how-can-i-remove-or-replace-svg-content
    my_svg.selectAll("*").remove(); // Permits re-draw for each iteration.
    my_svg.attr('width', restructureData.length * 100)
        .attr('height', restructureData[0].token_choices.length * 27)
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
            console.log(`Selected text: ${getSelectedText}`);

            (function () {
                console.log(`Initial input string to model: ${inputString}`);
                // https://stackoverflow.com/questions/1564818/how-to-break-nested-loops-in-javascript/1564838
                break_here:
                    for (let key in data_wrapper) {

                        for (let counter = 0; counter < data_wrapper[key]["Token " + key + " Decoded Choices"].length; counter++) {
                            if (data_wrapper[key]["Token " + key + " Decoded Choices"][counter] === getSelectedText) {
                                inputTokens.push(getSelectedText);
                                inputString = inputString.concat(getSelectedText);
                                break break_here;
                            }
                        }
                        inputTokens.push(data_wrapper[key]["Token " + key + " Decoded"]);
                        inputString = inputString.concat(data_wrapper[key]["Token " + key + " Decoded"]);
                    }
                // // Note: foreach doesn't support break, continue, or return.
                // Object.entries(data_wrapper).foreach(([key, value]) => {
                //
                //     for (let counter = 0; counter < value["Token " + key + " Decoded Choices"].length; counter++) {
                //         if (value["Token " + key + " Decoded Choices"][counter] === getSelectedText) {
                //             inputTokens.push(getSelectedText);
                //             inputString = inputString.concat(getSelectedText);
                //             break;
                //         }
                //     }
                //     inputTokens.push(value["Token " + key + " Decoded"]);
                //     // FIXME - not saving the first token...
                //     inputString = inputString.concat(value["Token " + key + " Decoded"]);
                // })
            })();
            console.log(`New input tokens (excluding original input to model): ${inputTokens}`);
            console.log(`New input string to model: ${inputString}`);

            // POST the user input text back to the web server.
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
                // Once we have results, call function to update visualization.
                if (debug === 2) {
                    console.log(`From Flask/Python: ${jsonObj}`);
                }
                saveJsonObject = jsonObj;
                // Clear for next selection and prediction.
                inputTokens = [];
                inputString = "";
                if (debug === 2) {
                    console.log(`saved json object: ${saveJsonObject}`);
                }
                demo.drawVisualization(jsonObj);
            });
        });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Function to visualize the GPT2-model's tokenization process.
 * https://stackoverflow.com/questions/41573175/how-do-append-a-text-for-every-element-of-the-data-in-a-d3-svg
 *
 * @param output: JSON response object.
 */
demo.drawVisualization2 = (output) => {
    let restructureData = demo.processData2(output);
    let debug = 0;
    let encoded = [];
    let decoded = [];

    for (let i = 0; i < restructureData.length; i++) {
        console.log(restructureData[i]);
        encoded.push(restructureData[i].selected_token);
        decoded.push(`${restructureData[i].token_choices}`);
    }

    if (debug) {
        console.log(restructureData);
        console.log(encoded);
        console.log(decoded);
    }

    let my_data = [encoded, decoded];

    let my_svg = d3.selectAll('svg#visualization-svg-2');  // select the svg element
    // https://stackoverflow.com/questions/10784018/how-can-i-remove-or-replace-svg-content
    my_svg.selectAll("*").remove(); // Permits re-draw for each iteration.
    my_svg.attr('width', 200)
        .attr('height', encoded.length * 30)
        .selectAll('g') // new selection starts here (and is empty for now)
        .data(my_data)
        .enter()
        .append('g') // selection now has n 'g' elements, one for each selected_token
        .style('transform', (d, i) => 'translate(' + (i * 100) + 'px, 50px)') // determine position of each "g" element.
        .selectAll('text') // new selection for text of each 'g' element.
        .data(d => d)
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('y', (d, i) => i * 20)
        .text(d => {
            return d;
        })
        .style('fill', 'red')
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////