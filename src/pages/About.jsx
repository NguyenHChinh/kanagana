import React from 'react';
import '../styles/About.css';
import githubLogo from '../assets/github.svg';
import linkedinLogo from '../assets/linkedin.svg';
import placeholderImage from '../assets/about-image.jpg';

function About() {
    return (
        <div className="about-page">
        <div className="about-header">
            <div className="about-text">
                <h1>
                    About <br /> Kanagana
                </h1>
            </div>
            <div className="about-image">
                <img src={placeholderImage} alt="About Kanagana visual" />
            </div>
        </div>

            <section className="mission">
                <h2 className="motive">Motive</h2>
                <p>
                    Kanagana was born out of personal growth and passion.
                    As a developer, I created this app to challenge myself:
                    building a full React application with interactive components,
                    progress tracking, and responsive design. But beyond my technical
                    skills, I wanted to make something genuinely useful for others
                    that may be trying to learn Japanese, especially those at the
                    beginning of their journey.
                </p>
                <p>
                    While Hiragana often gets more attention early on, I noticed that Katakana
                    tends to be under-represented in practice tools, even though it's
                    essential for reading loanwords, names, and everyday terminology.
                    That's why Kanagana puts an emphasis on Katakana exposure while offering
                    Hiragana practice for those who need it.
                    </p>
                <p>
                    I've always had an admiration for East Asian languages, and
                    Japanese is no exception. With Kanagana, I hoped to make learning
                    feel less like memorization and more like a game. Whether you're
                    revisiting the kana or seeing them for the first time, I wanted this
                    to feel light, approachable, and encouraging.
                    </p>
                <p>
                    Thank you for visiting Kanagana!
                </p>
            </section>

            <div className="tech-roadmap">
                <div className="tech-stack">
                    <h3>Tech Stack</h3>
                    <ul className="info-list">
                    <li>
                        <span className="icon">⚛️</span>
                        <div className="text">
                        <strong>React</strong>
                        <p>Frontend UI library</p>
                        </div>
                    </li>
                    <li>
                        <span className="icon">📜</span>
                        <div className="text">
                        <strong>JavaScript</strong>
                        <p>Logic and interactivity</p>
                        </div>
                    </li>
                    <li>
                        <span className="icon">🛠️</span>
                        <div className="text">
                        <strong>Vite</strong>
                        <p>Fast dev & build tooling</p>
                        </div>
                    </li>
                    </ul>
                </div>

                <div className="roadmap">
                    <h3>Roadmap</h3>
                    <ul className="info-list">
                    <li>
                        <span className="icon">🧠</span>
                        <div className="text">
                        <strong>Smarter Quiz Logic</strong>
                        <p>Instead of random, focus on weakpoints</p>
                        </div>
                    </li>
                    <li>
                        <span className="icon">📈</span>
                        <div className="text">
                        <strong>Progress Information</strong>
                        <p>Visualize strengths and weaknesses</p>
                        </div>
                    </li>
                    </ul>
                </div>
            </div>

            <section className="connect">
                <h3>Connect with me!</h3>
                <div className="buttons">
                    <a
                    href="https://github.com/NguyenHChinh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    >
                    <img src={githubLogo} alt="GitHub logo" />
                    GitHub
                    </a>
                    <a
                    href="https://www.linkedin.com/in/chinh-nguyen-71b5b6182/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    >
                    <img src={linkedinLogo} alt="LinkedIn logo" />
                    LinkedIn
                    </a>
                </div>
            </section>
        </div>
    );
}

export default About;
