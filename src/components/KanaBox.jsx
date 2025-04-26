import '../styles/KanaBox.css';

function KanaBox({ char, status, isInput }) {
    return (
        <div className={`kana-box${status ? " " + status : ""}${isInput ? " input-box" : ""}`}>
            <h1>
                {char}
            </h1>
        </div>
    );
}

export default KanaBox;
