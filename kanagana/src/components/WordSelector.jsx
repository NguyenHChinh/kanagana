import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function wordSelector() {

    const [words, setWords] = useState([]);
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

    const getRandomWord = () => {
        if (words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            return words[randomIndex];
        }
        return null;
    };

    return(
        <>
            <h1>Random Word: { getRandomWord() }</h1>
        </>
    )
}

export default wordSelector;