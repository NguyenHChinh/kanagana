import { useState, useEffect } from "react";
import './Kanabox.css';

function KanaBox(props) {

    return(
        <div className="kana-box">
            <h1>{ props.char }</h1>
        </div>
    )
}

export default KanaBox;