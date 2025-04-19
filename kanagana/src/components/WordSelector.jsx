import { useState, useEffect } from "react";
import KanaBox from "./KanaBox";
import KanaKeyboard from "./KanaKeyboard";
import katakanaToHiragana from '../data/katakanaToHiragana.json'
import './WordSelector.css';

function WordSelector() {
    const [words, setWords] = useState([]);
    const [randomWord, setRandomWord] = useState();
    const [brokenUpWord, setBrokenUpWord] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [kanaInput, setKanaInput] = useState("");
    const [expectedAnswer, setExpectedAnswer] = useState([]);

    const getRandomWord = () => {
        if (words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            return words[randomIndex];
        }
        return null;
    };

    function convertKana(str) {
        return str.split('').map(char => katakanaToHiragana[char] || char).join('');
    }

    useEffect(() => {
        const fetchKana = async () => {
            try {
                const response = await fetch('/katakanaWords.json');
                const data = await response.json();
                // console.log(data);
                setWords(data);
            } catch (error) {
                console.error('Error loading katakana words:', error);
            }
        };
        
        fetchKana();
    }, []);

    useEffect(() => {
        let temp = getRandomWord();

        if (!temp) {
            return;
        }

        console.log(temp);
        setRandomWord(temp);
    }, [words]);

    useEffect(() => {
        if (randomWord) {
            setBrokenUpWord(randomWord.split(""));
            setExpectedAnswer(convertKana(randomWord).split(""))
            // console.log(brokenUpWord);
        }
    }, [randomWord]);

    useEffect(() => {
        if (brokenUpWord.length > 0) {
            setAnswer(Array(brokenUpWord.length).fill(" "));
        }
    }, [brokenUpWord]);

    useEffect(() => {
        updateAnswerArray(kanaInput);
    }, [kanaInput]);

    const updateAnswerArray = (e) => {
        if (e.length > brokenUpWord.length) {
            setAnswer(e.substring(0, brokenUpWord.length).split(""));
        }
        else {
            let temp = e.split("");
            while (temp.length < brokenUpWord.length) {
                temp.push(" ");
            }
            setAnswer(temp);
        }
    }

    function handleSubmit() {
        let areEqual = answer.length === expectedAnswer.length &&
        answer.every((char, i) => char === expectedAnswer[i]);

        if (expectedAnswer.length == 0) {
            areEqual = false;
        }

        if (areEqual) {
            console.log("Correct answer!");
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


            <KanaKeyboard sendData={setKanaInput} onEnter={handleSubmit}/>

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

export default WordSelector;