import { useState, useEffect } from "react";

function KanaKeyboard() {
    const [input, setInput] = useState(" ");

    function inputChange(e) {
        setInput(e.target.value);
    }

    return(
        <div className="kana-keyboard-container">
            <h1>{ input }</h1>
            <input type="text" onChange={(e) => inputChange(e)}></input>
        </div>
    )
}

export default KanaKeyboard;