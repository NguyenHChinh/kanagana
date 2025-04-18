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
import { useParams } from "react-router-dom";

function KanaKeyboard({ sendData }) {
    const [updatedInput, setUpdatedInput] = useState("");
    const [input, setInput] = useState(" ");
    const [kana, setKana] = useState({});

    function inputChange(e) {
        setInput(e.target.value);
    }
    
    function processInput() {
        // TODO: Change way kana is typed so that backspace is more clear
        //       For example, typing "ra" and backspacing once only deletes the a, but
        //       I want the user to be able to delete the ”ら” that would appear.

        // I think I can do this by updating the text input value, but
        // I need to be able to skip the current value if letter is kana

        let processing = input;
        let finalInput = "";
        let processingSubstring = "";
        let finalValidIndex = 0;

        for (let i = 0; i < processing.length; i++) {
            processingSubstring += processing[i];
         
            if (processingSubstring in kana) {
                finalInput += kana[processingSubstring];
                finalValidIndex += processingSubstring.length;
                processingSubstring = "";
            }
        }

        sendData(finalInput);
        
        finalInput += processing.substring(finalValidIndex, processing.length);
        setUpdatedInput(finalInput);
    }
    
    useEffect(() => {
        const fetchKana = async () => {
            try {
                const response = await fetch('/kana.json');
                const data = await response.json();
                // console.log(data);
                setKana(data);
            } catch (error) {
                console.error('Error loading kana:', error);
            }
        };
        
        fetchKana();
    }, []);

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