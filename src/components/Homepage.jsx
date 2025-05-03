import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingKana from './FloatingKana';
import exampleProblem from '../assets/example.png';

import '../styles/Homepage.css';

function Homepage() {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            <header className="hero">
                <h1>Master Japanese Hiragana and Katakana</h1>
                <p>Interactive, beginner-friendly practice for beginner to intermediate Japanese learners</p>
                <div className="hero-buttons">
                    <button onClick={() => navigate("/practice")}>Start Practicing</button>
                    <button onClick={() => navigate("/progress")}>Track Progress</button>
                </div>
            </header>

            <section className="features">
                <h2>How It Works</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        <span className="icon">📚</span>
                        <h3>Study Smarter</h3>
                        <p>Master kana with targeted practice and repetition</p>
                    </div>
                    <div className="feature-item">
                        <span className="icon">📈</span>
                        <h3>Track Progress</h3>
                        <p>See how far you've come with mastery levels</p>
                    </div>
                        <div className="feature-item">
                        <span className="icon">⏱️</span>
                        <h3>Quick Sessions</h3>
                        <p>Hop in anytime, practice at your own pace</p>
                    </div>
                </div>
            </section>
    
            <h3>Example Katakana Problem</h3>
            <div className="example-image">
                <img
                    src={exampleProblem}
                    onClick={() => navigate("/practice/katakana")}
                    alt="Example Katakana problem" />
            </div>

            <FloatingKana/>
        </div>
    );
    }

export default Homepage;