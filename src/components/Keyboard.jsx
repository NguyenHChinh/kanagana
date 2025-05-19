// Keyboard.jsx

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import "../styles/Keyboard.css";

const Keyboard = forwardRef(({ sendData, onEnter, resetSignal, isCorrect, forcedInput }, ref) => {
    const [input, setInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        setInput("");
        sendData("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }, [resetSignal]);

    useEffect(() => {
        if (forcedInput !== undefined && forcedInput !== null) {
            setInput(forcedInput);
        }
    }, [forcedInput]);

    function handleKeyDown(e) {
        if (e.key === "Backspace") {
            setInput(input.slice(0, -1));
        }

        if (e.key === "Enter") {
            if (onEnter) {
                onEnter();
            }
            return;
        }

        else if (e.key.length === 1 && e.key.match(/[a-zA-Z\-]/)) {
            const output = input + e.key.toLowerCase();
            setInput(output);
            sendData(output);
        }
    }

    function focusInput() {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    useImperativeHandle(ref, () => ({
        focusInput,
    }));


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
    );
});

export default Keyboard;