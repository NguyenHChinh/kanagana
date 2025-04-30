import { useState, useEffect, useRef } from "react";
import KanaBox from './KanaBox';
import RomajiKeyboard from './RomajiKeyboard';
import hiraganaToRomaji from '../data/romaji.json'
import hiraganaWords from '../data/hiraganaWords.json';
import '../styles/SharedStyles.css';
import * as wanakana from "wanakana";

const getRandomWord = () => {
    return hiraganaWords[Math.floor(Math.random() * hiraganaWords.length)];
};

function checkSubmission(answer, submission) {
    const cleaned = submission.trim().toLowerCase();
    const asKana = wanakana.toKana(cleaned, { IMEMode: true });
    return answer === asKana;
}

function HiraganaWords() {
    // TODO: Work on answer checking, if correct, should generate
    //       a new word, if wrong, then should somehow notify user
    //       (can breakstorm on this one at a future time)

    // CURRENT RANDOM WORD + ARRAY FORM
    const [currentWord, setCurrentWord] = useState(getRandomWord());
    const [currentWordArray, setCurrentWordArray] = useState([]);
    
    // USER INPUT
    const [userInput, setUserInput] = useState("");

    // ARRAY TO EVALUATE EACH "KANA" IN ANSWER
    const [evaluation, setEvaluation] = useState("");

    // STATE USED TO TRIGGER COMPONENTS
    const [isCorrect, setIsCorrect] = useState(false);

    // STATE USED TO TRIGGER COMPONENTS
    const [trigger, setTrigger] = useState(0);

    const shakeTimeoutRef = useRef(null);

    useEffect(() => {
        if (currentWord) {
            setCurrentWordArray(currentWord.split(""));
        }
    }, [currentWord]);

    function handleSubmit() {
        if (isCorrect) {
            const newWord = getRandomWord();
            setCurrentWord(newWord);
            setTrigger(c => c + 1);
            setIsCorrect(false);

            if (shakeTimeoutRef.current) {
                clearTimeout(shakeTimeoutRef.current);
                shakeTimeoutRef.current = null;
            }
            setEvaluation("");
            return;
        }

        // const correct = newEvaluation.every(status => status === "correct");

        const userIsCorrect = checkSubmission(currentWord, userInput);

        if (userIsCorrect) {
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
            <div className="words-container">
                <div className="prompt">
                    <p>Type the reading for..</p>
                    <div className="word-container">
                        {currentWordArray.map((char, index) =>
                                <KanaBox
                                    char={char}
                                    key={`${trigger}`-`${index}`}
                                    status={isCorrect ? undefined : evaluation}
                                />
                            )
                        }
                    </div>
                </div>
            </div>

            <RomajiKeyboard
                sendData={setUserInput}
                onEnter={handleSubmit}
                resetSignal={trigger}
                isCorrect={isCorrect}
            />
        </>
    )
}

export default HiraganaWords;