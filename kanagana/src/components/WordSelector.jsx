import { useState, useEffect } from "react";

function WordSelector({ onWordSelect }) {
    const [words, setWords] = useState([]);

    useEffect(() => {
        const fetchKana = async () => {
            try {
                const response = await fetch('/katakanaWords.json');
                const data = await response.json();
                setWords(data);
            } catch (error) {
                console.error('Error loading katakana words:', error);
            }
        };
        
        fetchKana();
    }, []);

    useEffect(() => {
        if (words.length > 0 && onWordSelect) {
            const randomIndex = Math.floor(Math.random() * words.length);
            console.log(`Looks like it worked! ${words[randomIndex]}`);
            onWordSelect(words[randomIndex]);
        }
    }, [words, onWordSelect]);

    // useEffect(() => {
    //     if (randomWord) {
    //         setBrokenUpWord(randomWord.split(""));
    //         setExpectedAnswer(convertKana(randomWord).split(""))
    //         // console.log(brokenUpWord);
    //     }
    // }, [randomWord]);

    return null;
}

export default WordSelector;