import { useState, useEffect, useCallback } from "react";
import WordSelector from './WordSelector';
import KanaBox from './KanaBox';
import KanaKeyboard from './KanaKeyboard';
import katakanaToHiragana from '../data/katakanaToHiragana.json'
import katakanaWords from '../data/katakanaWords.json';
import './Katakana.css';

const getRandomWord = () => {
    return katakanaWords[Math.floor(Math.random() * katakanaWords.length)];
};

function Katakana() {
    // TODO: Work on answer checking, if correct, should generate
    //       a new word, if wrong, then should somehow notify user
    //       (can breakstorm on this one at a future time)

    const [currentWord, setCurrentWord] = useState(getRandomWord());
    const [brokenUpWord, setBrokenUpWord] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [kanaInput, setKanaInput] = useState("");
    const [expectedAnswer, setExpectedAnswer] = useState([]);
    const [trigger, setTrigger] = useState(0);

    function convertKana(str) {
        return str.split('').map(char => katakanaToHiragana[char] || char).join('');
    }

    useEffect(() => {
        if (currentWord) {
            setBrokenUpWord(currentWord.split(""));
            setExpectedAnswer(convertKana(currentWord).split(""))
        }
    }, [currentWord]);

    useEffect(() => {
        if (brokenUpWord.length > 0) {
            setAnswer(Array(brokenUpWord.length).fill(" "));
        }
    }, [brokenUpWord]);

    // Adjusting the array such that allows for .map function
    useEffect(() => {
        if (kanaInput.length > brokenUpWord.length) {
            setAnswer(kanaInput.substring(0, brokenUpWord.length).split(""));
        }
        else {
            let temp = kanaInput.split("");
            while (temp.length < brokenUpWord.length) {
                temp.push(" ");
            }
            setAnswer(temp);
        }
    }, [kanaInput]);


    function handleSubmit() {
        let areEqual = answer.length === expectedAnswer.length &&
        answer.every((char, i) => char === expectedAnswer[i]);

        if (expectedAnswer.length == 0) {
            areEqual = false;
        }

        if (areEqual) {
            console.log("Correct answer!");
            const newWord = getRandomWord();
            setCurrentWord(newWord);
            setTrigger(c => c + 1);
        }
        else {
            console.log("Wrong answer!");
            // Perhaps add a shake animation?
        }
    }

    return(
        <>
            <div className="question-container">
                <div className="word-container">
                    {brokenUpWord.map((char, index) =>
                            <KanaBox char={char} key={index}/>
                        )
                    }
                </div>

                <div className="word-container">
                    {answer.map((char, index) =>
                            <KanaBox char={char} key={index}/>
                        )
                    }
                </div>
            </div>


            <KanaKeyboard sendData={setKanaInput} onEnter={handleSubmit} resetSignal={trigger}/>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <h1 className="answer"> This is the answer (DEV-ONLY)</h1>
            <div className="word-container">
                {expectedAnswer.map((char, index) =>
                        <KanaBox char={char} key={index}/>
                    )
                }
            </div>
        </>
    )
}

export default Katakana;