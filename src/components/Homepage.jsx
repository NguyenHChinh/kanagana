import { useEffect } from 'react';

function Homepage() {
  return (
    <div className="homepage">
        <header className="hero">
            <h1>Master Japanese Hiragana and Katakana</h1>
            <p>Interactive, beginner-friendly practice for beginner to intermediate Japanese learners</p>
            <div className="hero-buttons"></div>
                <button>Start Practicing</button>
                <button>Track Progress</button>
        </header>
    </div>
  );
}

export default Homepage;