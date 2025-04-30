// RomajiKeyboard.jsx

import { useState, useEffect, useRef } from "react";
import kana from '../data/romaji.json';
import "../styles/KanaKeyboard.css";

function KanaKeyboard({ sendData, onEnter, resetSignal, isCorrect }) {
    const [userInput, setUserInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        sendData("");
        setUserInput("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }, [resetSignal]);

    function handleKeyDown(e) {
        if (e.key === "Backspace") {
            e.preventDefault();

            const newInput = userInput.slice(0, -1);
            sendData(newInput);
            setUserInput(newInput);

            return;
        }

        if (e.key === "Enter") {
            if (onEnter) {
                onEnter();
            }
            return;
        }

        if (e.key.length === 1 && e.key.match(/[a-zA-Z\-]/)) {
            const newInput = e.key.toLowerCase();

            setUserInput((prev) => prev + newInput);
            if (inputRef.current) {
                inputRef.current.value = userInput + newInput;
            }
            sendData((prev) => prev + newInput);
        }
    }


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
            <h1 className={userInput ? "" : "placeholder"}>
                {userInput || "Answer here.."}
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