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
    const [characters, setCharacters] = useState("");
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
            // Last character is unfinished kana
            if (romajiBuffer) {
                let output = romajiBuffer;
                output = output.substring(0, output.length - 1);
                setRomajiBuffer(output);
                // console.log(output);
            }
            // Last character is finished kana
            else if (characters) {
                let output = [...characters];
                output.pop();
                setCharacters(output);
                // console.log(output);
            }
            // Empty, nothing to do
            else {
                console.log("NOTHING TO ERASE");
            }
        }

        if (e.key.length === 1 && e.key.match(/[a-zA-Z\-]/)) {
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
                    newCharacters = [...characters];
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
                    newCharacters = [...characters];
                }
                newCharacters.push(matchedKana);
                const output = newCharacters.join("") + updatedBuffer.slice(matchLength);
                setUpdatedInput(output);
            }
        }
    }

    useEffect(() => {
        let output = ""
        if (characters) {
            output += characters.join("");
            sendData(characters.join(""));
        }
        if (romajiBuffer) {
            output += romajiBuffer;
        }
        setUpdatedInput(output);
    }, [characters, romajiBuffer]);
    
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