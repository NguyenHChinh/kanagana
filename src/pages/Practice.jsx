import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KanaKeyboard from "../components/KanaKeyboard";
import WordSelector from "../components/WordSelector";
import Hiragana from '../components/Hiragana.jsx';
import KatakanaWords from '../components/KatakanaWords.jsx';

function Practice() {
    const { kanaType } = useParams();
    console.log(`Just loaded ${kanaType}`);

    return(
        <>
            {kanaType === "hiragana" && <Hiragana />}
            {kanaType === "katakana-words" && <KatakanaWords />}
        </>
    )
}

export default Practice;