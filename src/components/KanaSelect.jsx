import { useNavigate } from "react-router-dom";
import '../styles/KanaSelect.css';

function KanaSelect() {
    const navigate = useNavigate();

    return(
        <div className="practice-select-page">
            <h1 className="title">What do you want to practice?</h1>
            <p className="subtitle">Pick a kana set to begin practicing.</p>
            <div className="kana-select-container">

                <button className="kana-select"onClick={() => navigate('/practice/hiragana')}>ひらがな</button>
                <button className="kana-select" onClick={() => navigate('/practice/katakana')}>カタカナ</button>
            </div>
        </div>
    )
}

export default KanaSelect;