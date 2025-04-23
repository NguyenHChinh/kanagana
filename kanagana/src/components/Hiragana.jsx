import { useState, useEffect, useCallback } from "react";
import hiraganaCharacters from '../data/hiraganaCharacters.json';
import KanaBox from './KanaBox';
import Keyboard from './Keyboard';
import './SharedStyles.css';

const getRandomHiragana = () => {
    return Object.keys(hiraganaCharacters)[Math.floor(Math.random() * Object.keys(hiraganaCharacters).length)];
  };

function Hiragana() {
    const [currentHiragana, setCurrentHiragana] = useState(getRandomHiragana());

    return(
        <>
            <div className="question-container">
                <div className="word-container">
                    <KanaBox
                        char={currentHiragana}
                    />
                </div>
            </div>

            <Keyboard/>
        </>
    )
}

export default Hiragana;