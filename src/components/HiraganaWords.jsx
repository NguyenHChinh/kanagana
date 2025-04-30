import { useState, useEffect, useCallback } from "react";
import KanaBox from './KanaBox';
import RomajiKeyboard from './RomajiKeyboard';
import hiraganaToRomaji from '../data/romaji.json'
import hiraganaWords from '../data/hiraganaWords.json';
import '../styles/SharedStyles.css';

const getRandomWord = () => {
    return hiraganaWords[Math.floor(Math.random() * hiraganaWords.length)];
};

function convertKana(str) {
    console.log(hiraganaToRomaji);
    let answer = str.split('').map(char => hiraganaToRomaji[char] || char).join('');
    console.log(answer);
    return answer;
}

function HiraganaWords() {
    // TODO: Work on answer checking, if correct, should generate
    //       a new word, if wrong, then should somehow notify user
    //       (can breakstorm on this one at a future time)

    // CURRENT RANDOM WORD + ARRAY FORM
    const [currentWord, setCurrentWord] = useState(getRandomWord());
    const [currentWordArray, setCurrentWordArray] = useState([]);

    // CURRENT RANDOM WORD IN ROMAJI
    const [currentAnswer, setCurrentAnswer] = useState([]);
    
    // USER INPUT + ADJUSTED
    const [kanaInput, setKanaInput] = useState([]);
    const [kanaInputAdjusted, setKanaInputAdjusted] = useState([]);

    // ARRAY TO EVALUATE EACH "KANA" IN ANSWER
    const [evaluation, setEvaluation] = useState([]);

    // STATE USED TO TRIGGER COMPONENTS
    const [isCorrect, setIsCorrect] = useState(false);

    // STATE USED TO TRIGGER COMPONENTS
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        if (currentWord) {
            setCurrentWordArray(currentWord.split(""));
            setCurrentAnswer(convertKana(currentWord).split(""))
        }
    }, [currentWord]);

    useEffect(() => {
        if (currentWordArray.length > 0) {
            setKanaInput(Array(currentWordArray.length).fill(" "));
        }
    }, [currentWordArray]);

    // Adjusting the array such that allows for .map function
    useEffect(() => {

        let adjusted = [];

        if (kanaInput.length > currentWordArray.length) {
            adjusted = kanaInput.slice(0, currentWordArray.length);
        }
        else {
            adjusted = [...kanaInput];
            while (adjusted.length < currentWordArray.length) {
                adjusted.push(" ");
            }
        }

        setKanaInputAdjusted(adjusted);
    }, [kanaInput]);

    function handleSubmit() {
        if (isCorrect) {
            const newWord = getRandomWord();
            setCurrentWord(newWord);
            setTrigger(c => c + 1);
            setIsCorrect(false);
            return;
        }

        if (currentAnswer.length === 0) {
            console.log("Critical Error: Empty Answer Array! How did you get here?");
            return;
        }

        const newEvaluation = [];

        for (let i = 0; i < currentAnswer.length; i++) {
            if (i >= kanaInput.length) {
                newEvaluation.push("missing");
            } else if (kanaInput[i] === currentAnswer[i]) {
                newEvaluation.push("correct");
            } else {
                newEvaluation.push("incorrect");
            }
        }

        setEvaluation(newEvaluation);

        const allCorrect = newEvaluation.every(status => status === "correct");

        if (allCorrect) {
            console.log("Correct answer!");
            setIsCorrect(true);
        }
        else {
            console.log("Wrong answer!");
            setTimeout(() => {
                setEvaluation([]);
            }, 3000);
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
                                    key={index}
                                />
                            )
                        }
                    </div>
                </div>
            </div>


            <RomajiKeyboard
                sendData={setKanaInput}
                onEnter={handleSubmit}
                resetSignal={trigger}
                isCorrect={isCorrect}
            />
        </>
    )
}

export default HiraganaWords;