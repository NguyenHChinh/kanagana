import { useState, useEffect, useCallback } from "react";
import hiraganaCharacters from '../data/hiraganaCharacters.json';
import KanaBox from './KanaBox';
import Keyboard from './Keyboard';
import '../styles/SharedStyles.css';

const getRandomHiragana = () => {
    return Object.keys(hiraganaCharacters)[Math.floor(Math.random() * Object.keys(hiraganaCharacters).length)];
  };

function Hiragana() {
    const [currentHiragana, setCurrentHiragana] = useState(getRandomHiragana());

    return(
        <>
            <div className="hiragana-container">
                <div className="prompt">
                    <p>Type the reading for..</p>
                    <div className="word-container">
                        <KanaBox
                            char={currentHiragana}
                        />
                    </div>
                </div>
            </div>

            <Keyboard/>
        </>
    )
}

export default Hiragana;