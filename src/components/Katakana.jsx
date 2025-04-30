import { useState, useEffect, useCallback, useRef } from "react";
import katakanaCharacters from '../data/katakanaCharacters.json';
import KanaBox from './KanaBox';
import Keyboard from './Keyboard';
import '../styles/SharedStyles.css';

const getRandomKatakana = () => {
    return Object.keys(katakanaCharacters)[Math.floor(Math.random() * Object.keys(katakanaCharacters).length)];
  };

function Katakana() {
    const [currentKatakana, setCurrentKatakana] = useState(getRandomKatakana());
    const [userInput, setUserInput] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [evaluation, setEvaluation] = useState("");
    const [trigger, setTrigger] = useState(0);

    const shakeTimeoutRef = useRef(null);
    
    function handleSubmit() {
        if (isCorrect) {
            let newKana = getRandomKatakana();
            while (newKana === currentKatakana) {
                newKana = getRandomKatakana();
            }
            setCurrentKatakana(newKana);
            setUserInput("");
            setTrigger(prev => prev + 1);
            setIsCorrect(false);

            if (shakeTimeoutRef.current) {
                clearTimeout(shakeTimeoutRef.current);
                shakeTimeoutRef.current = null;
            }
            setEvaluation("");
            return;
        }

        const correctAnswers = katakanaCharacters[currentKatakana];
        const userAnswer = userInput.trim().toLowerCase();

        const temp = correctAnswers.includes(userAnswer);

        if (temp) {
            console.log("Correct answer!");
            setIsCorrect(true);
        }
        else {
            console.log("Wrong answer!");
            setEvaluation("");

            setTimeout(() => {
                setEvaluation("shake");
    
                if (shakeTimeoutRef.current) {
                    clearTimeout(shakeTimeoutRef.current);
                }
    
                shakeTimeoutRef.current = setTimeout(() => {
                    setEvaluation("");
                    shakeTimeoutRef.current = null;
                }, 3000);
            }, 0);
        }
    }

    return(
        <>
            <div className="characters-container">
                <div className="prompt">
                    <p>Type the reading for..</p>
                    <div className="word-container">
                        <KanaBox
                            char={currentKatakana}
                            key={`${trigger}`}
                            status={isCorrect ? undefined : evaluation}
                        />
                    </div>
                </div>
            </div>

            <Keyboard
                sendData={setUserInput}
                onEnter={handleSubmit}
                resetSignal={trigger}
                isCorrect={isCorrect}
            />
        </>
    )
}

export default Katakana;