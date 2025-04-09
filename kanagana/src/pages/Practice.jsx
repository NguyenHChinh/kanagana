import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Back from "../components/Back";
import KanaKeyboard from "../components/KanaKeyboard";

function Practice() {
    const { kanaType } = useParams();

    return(
        <>
            <Back/>
            <h1>Hey! You're in { kanaType } right now.</h1>
            <KanaKeyboard/>
        </>
    )
}

export default Practice;