import { useNavigate } from "react-router-dom";
import '../styles/KanaSelect.css';

function KanaSelect() {
    const navigate = useNavigate();

    return(
        <div className="practice-select-page">
            <h1 className="title">What do you want to practice?</h1>
            <p className="subtitle">Pick a kana set to begin practicing.</p>
            <div className="kana-select-container">
                <div className="kana-card" onClick={() => navigate('/practice/hiragana')}>
                    <h2>ひらがな</h2>
                    <p>Hiragana</p>
                </div>
                <div className="kana-card" onClick={() => navigate('/practice/katakana')}>
                    <h2>カタカナ</h2>
                    <p>Katakana</p>
                </div>
            </div>
        </div>
    )
}

export default KanaSelect;