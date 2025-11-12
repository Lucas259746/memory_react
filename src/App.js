
import './App.css';
import React, { useEffect, useState } from "react";
import Card from "./component/Card/index.jsx";
import deck from "./cards.json";
import Header from './component/Header';
import Home from './pages/Home/';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [score, setScore] = useState(0);

  const shuffleCards = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [cards, setCards] = useState(() => shuffleCards(deck));
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    const allMatched = cards.every((card) => card.isMatched);
    if (allMatched) {
      setVictory(true);
    }
  }, [cards]);

useEffect(() => {
    if (choiceOne && choiceTwo) {
      setIsDisabled(true);

      if (choiceOne.pairId === choiceTwo.pairId) {
        // paire trouvée -> marquer et ajouter score
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.pairId === choiceOne.pairId) {
              return { ...card, isMatched: true, isFlipped: true };
            }
            return card;
          });
        });
        // ajouter 20 points par paire
        setScore((s) => s + 20);
        resetTurn();
      } else {
        setTimeout(() => {
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (card.id === choiceOne.id || card.id === choiceTwo.id) {
                return { ...card, isFlipped: false };
              }
              return card;
            });
          });
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const handleNewGame = () => {
    setCards(shuffleCards(deck));
    setChoiceOne(null);
    setChoiceTwo(null);
    setIsDisabled(false);
    setVictory(false);
    setScore(0); // reset score à nouvelle partie
  };

  const startGame = () => {
    setScore(0); // démarrer avec score à 0
    setIsGameStarted(true);
  };

  const backHome = () => {
    setIsGameStarted(false);
    handleNewGame();
  };
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setIsDisabled(false);
  };

  const handleChoice = (cardClicked) => {
    // empêche clics pendant délai, ou sur carte déjà trouvée, ou double clic sur même carte
    if (isDisabled || cardClicked.isMatched || (choiceOne && choiceOne.id === cardClicked.id)) {
      return;
    }

    // retourne la carte cliquée (isFlipped = true)
    setCards((prevCards) =>
      prevCards.map((c) => (c.id === cardClicked.id ? { ...c, isFlipped: true } : c))
    );

    // enregistre le choix 1 ou 2
    if (!choiceOne) {
      setChoiceOne(cardClicked);
    } else {
      setChoiceTwo(cardClicked);
    }
  };

  // Affiche la page d'accueil si le jeu n'a pas commencé
  if (!isGameStarted) {
    return <Home onStartGame={startGame} />;
  }

  return (
    <div className="App">
      {/* passer le score et isGameStarted au Header */}
      <Header
        onBackHome={backHome}
        onStartGame={startGame}
        score={score}
        isGameStarted={isGameStarted}
      />
      <div className="background"></div>
      {victory === true ? (
        <div>
          <h2>Bravo !!</h2>
          <button className="restart" onClick={handleNewGame}>
            Nouvelle partie
          </button>
          <button className="restart" onClick={backHome}>
            Accueil
          </button>
        </div>
      ) : (
        <section className="card-grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              handleChoice={handleChoice}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default App;