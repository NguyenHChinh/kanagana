import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KanaBox from "./KanaBox";
import KanaKeyboard from "./KanaKeyboard";
import katakanaToHiragana from '../data/katakanaToHiragana.json'

function WordSelector() {

    const [words, setWords] = useState([]);
    const [randomWord, setRandomWord] = useState();
    const [brokenUpWord, setBrokenUpWord] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [kanaInput, setKanaInput] = useState("");
    const [expectedAnswer, setExpectedAnswer] = useState([]);

    const { kanaType } = useParams();

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

    const getRandomWord = () => {
        if (words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            return words[randomIndex];
        }
        return null;
    };

    useEffect(() => {
        handleInputChange(kanaInput);
    }, [kanaInput]);

    useEffect(() => {
        let areEqual = answer.length === expectedAnswer.length &&
        answer.every((char, i) => char === expectedAnswer[i]);

        if (expectedAnswer.length == 0) {
            areEqual = false;
        }

        if (areEqual) {
            console.log("DING DING DING");
        }
    }, [answer, expectedAnswer]);

    const handleInputChange = (e) => {
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

    function convertKana(str) {
        return str.split('').map(char => katakanaToHiragana[char] || char).join('');
    }

    return(
        <>
            <h1>Random Word:</h1>

            <div className="word-container">
                {brokenUpWord.map((char, index) =>
                        <KanaBox char={char} key={index}/>
                    )
                }
            </div>

            <div className="word-container">
                {expectedAnswer.map((char, index) =>
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

            <h1>Test Input:</h1>
            <input type="text" onChange={(e) => handleInputChange(e.target.value)}></input>

            <KanaKeyboard sendData={setKanaInput}/>

        </>
    )
}

export default WordSelector;