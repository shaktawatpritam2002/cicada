import React from 'react';
import './Mainpage.css';

function MainPage() {
  return (
    <div className="cicada-container">
      <header className="cicada-header">
        <h1 className="cicada-title">Cicada 3301</h1>
      </header>

      <main className="cicada-content">
        <section className="cicada-intro">
          <h2 className="cicada-subtitle">Welcome to the Cicada 3301 Enigma</h2>
          <p className="cicada-text">
            Cicada 3301 is an annual online puzzle that has captivated the internet since 2012. It is an enigmatic challenge that tests the limits of human intellect and problem-solving abilities.
          </p>
        </section>

        <section className="cicada-about">
          <h2 className="cicada-subtitle">About Cicada 3301</h2>
          <p className="cicada-text">
            Cicada 3301 is a mysterious organization that has been posting annual puzzles and challenges since 2012. The identity and purpose of Cicada 3301 are unknown, adding to the intrigue and allure of the puzzle.
          </p>
        </section>

        <section className="cicada-participate">
          <h2 className="cicada-subtitle">Participate in the Puzzle</h2>
          <p className="cicada-text">
            If you're interested in joining the Cicada 3301 challenge, keep an eye out for new puzzles and clues that may appear online. Be prepared to use your critical thinking, cryptography, and problem-solving skills to unravel the mystery.
          </p>
        </section>
      </main>

      <footer className="cicada-footer">
        <p className="cicada-text">&copy; Cicada 3301</p>
      </footer>
    </div>
  );
}

export default MainPage;