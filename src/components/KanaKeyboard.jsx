// KanaKeyboard.jsx

// Developer Note: To be frank, I'm not even sure if
// if this is the right path I want to take for this project.
//
// It wouldn't make sense for the letters to automatically
// translate to a kana when you're practicing, say, Hiragana.
// 
// In the meantime, I will be developing this for the use of the
// katakana tool, since showing the hiragana would make sense.

// Developer Note Update: I think this component could be used
// in the future, more than just a katakana practice keyboard.
// It could be used for a future "Kanji" practice tool, maybe!

import { useState, useEffect, useRef } from "react";
import kana from '../data/kana.json';
import "../styles/KanaKeyboard.css";

function KanaKeyboard({ sendData, onEnter, resetSignal, isCorrect }) {
    const [characters, setCharacters] = useState([]);
    const [romajiBuffer, setRomajiBuffer] = useState("");
    const [updatedInput, setUpdatedInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setCharacters([]);
        setRomajiBuffer("");
        sendData("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }, [resetSignal]);

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

        if (e.key === "Enter") {
            if (onEnter) {
                onEnter();
            }
            return;
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
                for (let i = 0; i < matchedKana.length; i++) {
                    newCharacters.push(matchedKana[i]);
                }
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

    function focusInput() {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
    
    return(
        <div
            className={`kana-keyboard-container ${isCorrect ? "correct" : ""} ${isFocused ? "focused" : ""}`}
            onClick={focusInput}
        >
            <h1 className={updatedInput ? "" : "placeholder"}>
                {updatedInput || "Answer here.."}
            </h1>
            <input
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="hidden-input"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
            />
        </div>
    )
}

export default KanaKeyboard;