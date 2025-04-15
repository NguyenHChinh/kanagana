import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KanaBox from "./KanaBox";
import KanaKeyboard from "./KanaKeyboard";

function WordSelector() {

    const [words, setWords] = useState([]);
    const [randomWord, setRandomWord] = useState();
    const [brokenUpWord, setBrokenUpWord] = useState([]);
    const [answer, setAnswer] = useState([]);

    const { kanaType } = useParams();

    useEffect(() => {
        const fetchKana = async () => {
            try {
                const response = await fetch('/katakanaWords.json');
                const data = await response.json();
                console.log(data);
                setWords(data);
            } catch (error) {
                console.error('Error loading katakana words:', error);
            }
        };
        
        fetchKana();
    }, []);

    useEffect(() => {
        let temp = getRandomWord();
        console.log(temp);
        setRandomWord(temp);
    }, [words]);

    useEffect(() => {
        if (randomWord) {
            setBrokenUpWord(randomWord.split(""));
            console.log(brokenUpWord);
        }
    }, [randomWord]);

    useEffect(() => {
        for (let i = 0; i < brokenUpWord.length; i++) {
            setAnswer((prev) => [...prev, " "]);
        }
    }, [brokenUpWord]);

    const getRandomWord = () => {
        if (words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            return words[randomIndex];
        }
        return null;
    };

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
                {answer.map((char, index) =>
                        <KanaBox char={char} key={index}/>
                    )
                }
            </div>

            <h1>Test Input:</h1>
            <input type="text" onChange={(e) => handleInputChange(e.target.value)}></input>

            <KanaKeyboard/>

        </>
    )
}

export default WordSelector;