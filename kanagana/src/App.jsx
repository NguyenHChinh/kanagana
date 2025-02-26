import { useState } from 'react'

function App() {

  const [showText, setShowText] = useState(true);

  const handleClick = (input) => {
    setShowText(false);
    console.log(`${input} was clicked`);
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
      </div>
    </>
  )
}

export default App
