import { useState } from 'react'
import Hiragana from './components/Hiragana.jsx'

function App() {

  const [showText, setShowText] = useState(true);
  const [selectedAlphabet, setSelectedAlphabet] = useState("");

  const handleClick = (input) => {
    setShowText(false);
    console.log(`${input} was clicked`);
    setSelectedAlphabet(input);
  };

  return (
    <>
      <div className="main-container">
        {showText && (
          <>
            <h1 onClick={() => handleClick("hiragana")}>ひらがな</h1>
            <h1 onClick={() => handleClick("katakana")}>カタカナ</h1>
          </>
        )}

        {!showText && (selectedAlphabet == "hiragana") && (
          <Hiragana/>
        )}
      </div>
    </>
  )
}

export default App
