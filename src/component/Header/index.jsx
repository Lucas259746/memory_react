import React, { useState } from "react";
import "/Users/dell/my-app/src/App.css";

const Header = ({ onBackHome, onStartGame, onLogin }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (fn) => {
    setOpen(false);
    if (fn) fn();
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="brand">Memory DBZ</h1>

        <nav className={`nav ${open ? "open" : ""}`} aria-hidden={!open}>
          <ul>
            <li>
              <button onClick={() => handleClick(onBackHome)}>Accueil</button>
            </li>
            <li>
              <button onClick={() => handleClick(onLogin)}>Connexion</button>
            </li>
            <li>
              <button onClick={() => handleClick(onStartGame)}>Accès au jeu</button>
            </li>
          </ul>
        </nav>

        <button
          className={`burger ${open ? "open" : ""}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
