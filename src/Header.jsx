import React from 'react';
import "/Users/dell/my-app/src/App.css";

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <h1>Memory Game Dragon Ball Z</h1>
                <div className="header-stats">
                    <span className="score">Score: 0</span>
                    <span className="timer">Time: 0s</span>
                </div>
            </div>
        </header>
    );
};

export default Header;