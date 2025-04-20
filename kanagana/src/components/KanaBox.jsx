import { useState, useEffect } from "react";
import './Kanabox.css';

function KanaBox( {char, status} ) {

    if (status) {
        console.log(`kana-box${status}`);
    }

    return(
        <div className={`kana-box${status ? " " + status : ""}`}>
            <h1>{ char }</h1>
        </div>
    )
}

export default KanaBox;