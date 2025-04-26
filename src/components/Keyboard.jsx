// Keyboard.jsx

import { useState, useEffect, useRef } from "react";
import "../styles/Keyboard.css";

function Keyboard( sendData, resetSignal, isCorrect) {
    const [input, setInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef(null);

    function handleKeyDown(e) {
        
    }

    function focusInput() {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    return(
        <div
            className={`keyboard-container ${isCorrect ? "correct" : ""} ${isFocused ? "focused" : ""}`}
            onClick={focusInput}
        >
            <h1 className={input ? "" : "placeholder"}>
                {input || "Answer here.."}
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

export default Keyboard;