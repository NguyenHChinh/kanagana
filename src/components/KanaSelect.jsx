import { useNavigate } from "react-router-dom";
import './KanaSelect.css';

function KanaSelect() {
    const navigate = useNavigate();

    return(
        <div className="kana-select-container">

            <button className="kana-select"onClick={() => navigate('/practice/hiragana')}>ひらがな</button>
            <button className="kana-select" onClick={() => navigate('/practice/katakana')}>カタカナ</button>
        </div>
    )
}

export default KanaSelect;