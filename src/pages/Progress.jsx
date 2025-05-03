import { useState, useEffect } from 'react';
import kana from '../data/floatingKana.json';
import '../styles/Progress.css';

// Function to generate random progress percentages for each kana
function getRandomProgressList(kanaList) {
    return kanaList
        .map(kana => ({
            char: kana,
            percent: Math.floor(Math.random() * 33) + 68 // 68 to 100
        }))
    .sort((a, b) => b.percent - a.percent);
}
  
// Function to get color class based on percentage
function getColorClass(percent) {
    if (percent >= 95) return "green";
    if (percent >= 90) return "light-green";
    if (percent >= 80) return "orange";
    if (percent >= 70) return "yellow";
    return "red";
}
  
function Progress() {
    const hiraganaProgress = getRandomProgressList(kana.hiragana);
    const katakanaProgress = getRandomProgressList(kana.katakana);

    return (
        <div className="progress-container">
            <h1 className="title">W.I.P. Progress Page</h1>
            <p className="subtitle">Coming soon! Stay tuned.</p>

            <div className="preview-blur">
                <div className="progress-kana-split-row">
                    <div className="progress-kana-side">
                        <h2 className="progress-kana-type">Hiragana</h2>
                        <div className="progress-kana-flex">
                            {hiraganaProgress.map(({ char, percent }, i) => (
                                <div className={`progress-kana-box ${getColorClass(percent)}`} key={`h-${i}`}>
                                <h1>{char}</h1>
                                <p>{percent}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="progress-kana-side">
                        <h2 className="progress-kana-type">Katakana</h2>
                        <div className="progress-kana-flex">
                            {katakanaProgress.map(({ char, percent }, i) => (
                                <div className={`progress-kana-box ${getColorClass(percent)}`} key={`k-${i}`}>
                                <h1>{char}</h1>
                                <p>{percent}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Progress;