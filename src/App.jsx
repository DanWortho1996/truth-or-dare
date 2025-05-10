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

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const themes = ['light', 'dark', 'retro', 'party'];

  return (
    <div className="app-container">
      <div style={{ marginBottom: '10px' }}>
        {themes.map((t) => (
          <button key={t} onClick={() => changeTheme(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
        ))}
      </div>

      <Instructions />

      {!isGameStarted ? (
        <SetupScreen onStartGame={handleStartGame} />
      ) : (
        <GameScreen players={players} theme={theme} />
      )}
    </div>
  );
}

export default App;
