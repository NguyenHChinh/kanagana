// KanaKeyboard.jsx

// Developer Note: To be frank, I'm not even sure if
// if this is the right path I want to take for this project.
//
// It wouldn't make sense for the letters to automatically
// translate to a kana when you're practicing, say, Hiragana.
// 
// In the meantime, I will be developing this for the use of the
// katakana tool, since showing the hiragana would make sense.

import { useState, useEffect } from "react";

function KanaKeyboard() {
    const [updatedInput, setUpdatedInput] = useState("");
    const [input, setInput] = useState(" ");

    let kana = {
        "a": "あ",
        "i": "い",
        "u": "う",
        "e": "え",
        "o": "お",
        "ka": "か",
        "ki": "き",
        "ku": "く",
        "ke": "け",
        "ko": "こ",
        "sa": "さ",
        "shi": "し",
        "su": "す",
        "se": "せ",
        "so": "そ",
    }

    function inputChange(e) {
        setInput(e.target.value);
    }
    
    function processInput() {
        let processing = input;
        let finalInput = "";
        let processingSubstring = "";

        for (let i = 0; i < processing.length; i++) {
            processingSubstring += processing[i];
         
            if (processingSubstring in kana) {
                finalInput += kana[processingSubstring];
                processing = processing.replace(processingSubstring, "");
                processingSubstring = "";
            }
        }

        finalInput += processing;

        setUpdatedInput(finalInput);
    }
    
    useEffect(() => {
        processInput();
    }, [input]);

    return(
        <div className="kana-keyboard-container">
            <h1>Input: { updatedInput }</h1>
            <input type="text" onChange={(e) => inputChange(e)}></input>
        </div>
    )
}

export default KanaKeyboard;