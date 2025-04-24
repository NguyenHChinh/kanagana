import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        </div>
    );
    }

export default Homepage;