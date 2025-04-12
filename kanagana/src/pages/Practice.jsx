import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Back from "../components/Back";
import KanaKeyboard from "../components/KanaKeyboard";
import WordSelector from "../components/WordSelector";

function Practice() {
    const { kanaType } = useParams();

    return(
        <>
            <Back/>
            <h1>{ kanaType.toUpperCase() }</h1>

            <WordSelector kanaType={kanaType}/>

            {kanaType === "katakana" && <KanaKeyboard />}
        </>
    )
}

export default Practice;