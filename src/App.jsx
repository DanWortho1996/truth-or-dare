import React, { useState, useEffect } from 'react';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import Instructions from './components/Instructions';

import './styles.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [theme, setTheme] = useState('light');

  const handleStartGame = (playersList) => {
    setPlayers(playersList);
    setIsGameStarted(true);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Apply theme class to the <body> tag
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app-container">
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Instructions />
      {!isGameStarted ? (
        <SetupScreen onStartGame={handleStartGame} />
      ) : (
        <GameScreen players={players} />
      )}
    </div>
  );
}

export default App;
