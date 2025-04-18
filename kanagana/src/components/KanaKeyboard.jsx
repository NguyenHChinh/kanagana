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
import "./KanaKeyboard.css";

function KanaKeyboard({ sendData }) {
    const [updatedInput, setUpdatedInput] = useState("");
    const [input, setInput] = useState(" ");
    const [characters, setCharacters] = useState("");
    const [segments, setSegments] = useState([]);
    const [romajiBuffer, setRomajiBuffer] = useState("");
    const [kana, setKana] = useState({});

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

    function handleKeyDown(e) {
        if (e.key === "Backspace") {
            console.log("backspace weee");
        }

        if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
            const updatedBuffer = romajiBuffer + e.key.toLowerCase();

            let matchedKana = null;
            let matchLength = 0;

            for (let i = 1; i <= updatedBuffer.length; i++) {
                const substr = updatedBuffer.slice(0, i);
                if (kana[substr]) {
                    matchedKana = kana[substr];
                    matchLength = i;
                }
            }

            if (matchedKana) {
                let newCharacters = []
                if (characters) {
                    newCharacters = characters;
                }
                newCharacters.push(matchedKana);
                setCharacters(newCharacters);
                setRomajiBuffer(updatedBuffer.slice(matchLength));
            
                const output = newCharacters.join("") + updatedBuffer.slice(matchLength);
                setUpdatedInput(output);
            } else {
                setRomajiBuffer(updatedBuffer);
                let newCharacters = []
                if (characters) {
                    newCharacters = characters;
                }
                newCharacters.push(matchedKana);
                const output = newCharacters.join("") + updatedBuffer.slice(matchLength);
                setUpdatedInput(output);
            }
        }
    }

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
        processInput();
    }, [input]);

    return(
        <div className="kana-keyboard-container"
            tabIndex={0}
            onKeyDown={handleKeyDown}>
            <h1>{ updatedInput }</h1>
            {/* <input type="text" onChange={(e) => inputChange(e)}></input> */}
        </div>
    )
}

export default KanaKeyboard;