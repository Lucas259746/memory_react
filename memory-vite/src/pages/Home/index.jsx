import React from 'react';
import './styles.css';
import Header from '../../component/Header'; 

const Home = ({ onStartGame, onBackHome, onLogin }) => {
  return (
    <>
      <Header onBackHome={onBackHome} onStartGame={onStartGame} onLogin={onLogin} />
      <div className="home">
        <div className="home-container">
          <h1>Memory Game Dragon Ball Z</h1>
          <p>Bienvenue dans le jeu Memory Dragon Ball Z!</p>
          <div className="home-buttons">
            <button className="btn-start" onClick={onStartGame}>Commencer</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;