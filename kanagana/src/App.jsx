import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import KanaSelect from "./components/KanaSelect";
import Hiragana from './components/Hiragana.jsx'
import Katakana from './components/Katakana.jsx'

function App() {

  const [showText, setShowText] = useState(true);
  const [selectedAlphabet, setSelectedAlphabet] = useState("");

  const handleClick = (input) => {
    setShowText(false);
    console.log(`${input} was clicked`);
    setSelectedAlphabet(input);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<KanaSelect/>}/>
      </Routes>
    </Router>

    // <>
    //   <div className="main-container">
    //     {showText && (
    //       <>
    //         <h1 onClick={() => handleClick("hiragana")}>ひらがな</h1>
    //         <h1 onClick={() => handleClick("katakana")}>カタカナ</h1>
    //       </>
    //     )}

    //     {!showText && (selectedAlphabet == "hiragana") && (
    //       <Hiragana/>
    //     )}

    //     {!showText && (selectedAlphabet == "katakana") && (
    //       <Katakana/>
    //     )}
    //   </div>
    // </>
  )
}

export default App
