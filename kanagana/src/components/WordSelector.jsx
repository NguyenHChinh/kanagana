import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KanaBox from "./KanaBox";

function WordSelector() {

    const [words, setWords] = useState([]);
    const [randomWord, setRandomWord] = useState();
    const [brokenUpWord, setBrokenUpWord] = useState([]);

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

    const getRandomWord = () => {
        if (words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            return words[randomIndex];
        }
        return null;
    };

    return(
        <>
            <h1>Random Word:</h1>

            <div className="word-container">
                {brokenUpWord.map((char, index) =>
                        <KanaBox char={char} key={index}/>
                    )
                }
            </div>
        </>
    )
}

export default WordSelector;