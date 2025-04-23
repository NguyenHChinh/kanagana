import './KanaBox.css';

function KanaBox({ char, status }) {
    return (
        <div className={`kana-box${status ? " " + status : ""}`}>
            <h1>
                {char}
            </h1>
        </div>
    );
}

export default KanaBox;
