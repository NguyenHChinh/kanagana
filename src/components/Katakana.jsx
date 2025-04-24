import { useState, useEffect, useCallback } from "react";
import KanaBox from './KanaBox';
import KanaKeyboard from './KanaKeyboard';
import katakanaToHiragana from '../data/katakanaToHiragana.json'
import katakanaWords from '../data/katakanaWords.json';
import '../styles/SharedStyles.css';

const getRandomWord = () => {
    return katakanaWords[Math.floor(Math.random() * katakanaWords.length)];
};

function convertKana(str) {
    return str.split('').map(char => katakanaToHiragana[char] || char).join('');
}

function Katakana() {
    // TODO: Work on answer checking, if correct, should generate
    //       a new word, if wrong, then should somehow notify user
    //       (can breakstorm on this one at a future time)

    // CURRENT RANDOM WORD + ARRAY FORM
    const [currentWord, setCurrentWord] = useState(getRandomWord());
    const [currentWordArray, setCurrentWordArray] = useState([]);

    // CURRENT RANDOM WORD IN HIRAGANA
    const [currentWordHiragana, setCurrentWordHiragana] = useState([]);
    
    // USER INPUT + ARRAY FORM
    const [kanaInput, setKanaInput] = useState("");
    const [kanaInputArray, setKanaInputArray] = useState([]);

    // ARRAY TO EVALUATE EACH "KANA" IN ANSWER
    const [evaluation, setEvaluation] = useState([]);

    // STATE USED TO TRIGGER COMPONENTS
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        if (currentWord) {
            setCurrentWordArray(currentWord.split(""));
            setCurrentWordHiragana(convertKana(currentWord).split(""))
        }
    }, [currentWord]);

    useEffect(() => {
        if (currentWordArray.length > 0) {
            setKanaInputArray(Array(currentWordArray.length).fill(" "));
        }
    }, [currentWordArray]);

    // Adjusting the array such that allows for .map function
    useEffect(() => {
        setEvaluation([]);

        if (kanaInput.length > currentWordArray.length) {
            setKanaInputArray(kanaInput.substring(0, currentWordArray.length).split(""));
        }
        else {
            let temp = kanaInput.split("");
            while (temp.length < currentWordArray.length) {
                temp.push(" ");
            }
            setKanaInputArray(temp);
        }
    }, [kanaInput]);

    function handleSubmit() {
        if (currentWordHiragana.length === 0) {
            console.log("Critical Error: Empty Answer Array! How did you get here?");
            return;
        }

        const newEvaluation = [];

        for (let i = 0; i < currentWordHiragana.length; i++) {
            if (i >= kanaInput.length) {
                newEvaluation.push("missing");
            } else if (kanaInput[i] === currentWordHiragana[i]) {
                newEvaluation.push("correct");
            } else {
                newEvaluation.push("incorrect");
            }
        }

        setEvaluation(newEvaluation);

        const allCorrect = newEvaluation.every(status => status === "correct");

        if (allCorrect) {
            console.log("Correct answer!");
            const newWord = getRandomWord();
            setCurrentWord(newWord);
            setTrigger(c => c + 1);
            setEvaluation([]);
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
            <div className="question-container">
                <div className="word-container">
                    {currentWordArray.map((char, index) =>
                            <KanaBox
                                char={char}
                                key={index}
                            />
                        )
                    }
                </div>

                <div className="word-container">
                    {kanaInputArray.map((char, index) =>
                            <KanaBox
                                char={char}
                                key={`${index}-${trigger}-${char}`}
                                status={evaluation[index]}
                            />
                        )
                    }
                </div>
            </div>


            <KanaKeyboard sendData={setKanaInput} onEnter={handleSubmit} resetSignal={trigger}/>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <h1 className="answer"> This is the answer (DEV-ONLY)</h1>
            <div className="word-container">
                {currentWordHiragana.map((char, index) =>
                        <KanaBox
                            char={char}
                            key={index}
                        />
                    )
                }
            </div>
        </>
    )
}

export default Katakana;