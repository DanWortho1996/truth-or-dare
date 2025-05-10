import React, { useState, useEffect } from 'react';
import { truthQuestions, dareQuestions } from '../data/questions';

function GameScreen({ players }) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerLives, setPlayerLives] = useState(players.map(() => 3));
  const [shuffledTruths, setShuffledTruths] = useState([]);
  const [shuffledDares, setShuffledDares] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const [braveryCount, setBraveryCount] = useState({});
  const [chickenCount, setChickenCount] = useState({});

  useEffect(() => {
    setShuffledTruths(shuffle([...truthQuestions]));
    setShuffledDares(shuffle([...dareQuestions]));
  }, []);

  const handleChoice = (playerName, choice) => {
    if (choice === 'truth') {
      setBraveryCount(prev => ({ ...prev, [playerName]: (prev[playerName] || 0) + 1 }));
    } else if (choice === 'dare') {
      setChickenCount(prev => ({ ...prev, [playerName]: (prev[playerName] || 0) + 1 }));
    }
  };

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const handleTruth = () => {
    handleChoice(players[currentPlayerIndex], 'truth');
    if (shuffledTruths.length === 0) {
      setShuffledTruths(shuffle([...truthQuestions]));
    }
    const question = shuffledTruths.pop();
    setCurrentQuestion(question);
  };

  const handleDare = () => {
    handleChoice(players[currentPlayerIndex], 'dare');
    if (shuffledDares.length === 0) {
      setShuffledDares(shuffle([...dareQuestions]));
    }
    const question = shuffledDares.pop();
    setCurrentQuestion(question);
  };

  const isPlayerEliminated = (index) => playerLives[index] === 0;

  const handlePlayerAction = (didParticipate) => {
    const newLives = [...playerLives];
    if (!didParticipate) {
      newLives[currentPlayerIndex] -= 1;
    }
    setPlayerLives(newLives);

    if (newLives[currentPlayerIndex] === 0) {
      setEliminatedPlayers((prev) => [...prev, players[currentPlayerIndex]]);
    }

    setCurrentQuestion('');
    moveToNextPlayer(newLives);
  };

  const moveToNextPlayer = (updatedLives) => {
    const lives = updatedLives || playerLives;
    let nextIndex = currentPlayerIndex;

    do {
      nextIndex = (nextIndex + 1) % players.length;
    } while (
      lives[nextIndex] === 0 &&
      players.filter((_, idx) => lives[idx] > 0).length > 1
    );

    setCurrentPlayerIndex(nextIndex);

    const remainingPlayers = players.filter((_, idx) => lives[idx] > 0);
    if (remainingPlayers.length === 1) {
      setTimeout(() => {
        setShowWinnerPopup(true);
      }, 2000);
    }
  };

  const getBravest = () => {
    return Object.entries(braveryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  };

  const getChickened = () => {
    return Object.entries(chickenCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  };

  return (
    <div>
      <h2>Current Player: {players[currentPlayerIndex]}</h2>

      <div className="player-lives">
        {players.map((player, index) => (
          <div
            key={index}
            className={`player-box ${index === currentPlayerIndex ? 'highlight' : ''} ${isPlayerEliminated(index) ? 'eliminated' : ''}`}
          >
            <p>{player}</p>
            <div className="life-bars">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`life-bar ${i < playerLives[index] ? 'alive' : 'dead'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="question-section">
        {currentQuestion && <p className="question">{currentQuestion}</p>}

        {!currentQuestion && !isPlayerEliminated(currentPlayerIndex) && (
          <>
            <button onClick={handleTruth}>Truth</button>
            <button onClick={handleDare}>Dare</button>
          </>
        )}

        {currentQuestion && !isPlayerEliminated(currentPlayerIndex) && (
          <>
            <button onClick={() => handlePlayerAction(true)}>✔ Done</button>
            <button onClick={() => handlePlayerAction(false)}>✘ Skipped</button>
          </>
        )}

        {isPlayerEliminated(currentPlayerIndex) && (
          <p>{players[currentPlayerIndex]} is eliminated!</p>
        )}
      </div>

      {showWinnerPopup && (
        <div className="winner-popup">
          <h3>Congratulations! You won, {players.find((_, idx) => !isPlayerEliminated(idx))}!</h3>
          <h4>Bravest Player: {getBravest()}</h4>
          <h4>Most Chickened Out: {getChickened()}</h4>
          <button onClick={() => setShowWinnerPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default GameScreen;
