import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Practice from "./pages/Practice";
import Home from './pages/Home.jsx';
import Progress from './pages/Progress.jsx';
import About from './pages/About.jsx';
import PracticeSelect from './pages/PracticeSelect';
import Navbar from './components/Navbar.jsx';

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
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/practice" element={<PracticeSelect/>}/>
        <Route path="/practice/:kanaType" element={<Practice/>}/>
        <Route path="/progress" element={<Progress/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </Router>
  )
}

export default App
