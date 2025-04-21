import { useState, useEffect, useCallback } from "react";
import hiraganaCharacters from '../data/hiraganaCharacters.json';

const getRandomHiragana = () => {
    return Object.keys(hiraganaCharacters)[Math.floor(Math.random() * Object.keys(hiraganaCharacters).length)];
  };

function Hiragana() {
    const [currentHiragana, setCurrentHiragana] = useState(getRandomHiragana());

    return(
        <>
            <h1>{currentHiragana}</h1>
        </>
    )
}

export default Hiragana;