import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KanaKeyboard from "../components/KanaKeyboard";
import WordSelector from "../components/WordSelector";
import Hiragana from '../components/Hiragana.jsx';
import Katakana from '../components/Katakana.jsx';

function Practice() {
    const { kanaType } = useParams();
    console.log(`Just loaded ${kanaType}`);

    return(
        <>
            {kanaType === "hiragana" && <Hiragana />}
            {kanaType === "katakana" && <Katakana />}
        </>
    )
}

export default Practice;