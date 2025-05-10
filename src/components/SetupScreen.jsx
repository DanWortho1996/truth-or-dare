import React, { useState } from 'react';

function SetupScreen({ onStartGame }) {
  const [playerNames, setPlayerNames] = useState([]); // Store player names
  const [playerCount, setPlayerCount] = useState(0); // Track number of players

  // Handle player name changes
  const handlePlayerNameChange = (index, name) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = name;
    setPlayerNames(updatedNames);
  };

  // Add a new player input field
  const handleAddPlayer = () => {
    setPlayerCount(playerCount + 1); // Increase player count
    setPlayerNames([...playerNames, '']); // Add an empty string for the new player's name
  };

  // Start the game by passing the player names
  const handleStart = () => {
    if (playerNames.every((name) => name !== "")) { // Ensure all players have names
      onStartGame(playerNames); // Call parent function to start the game
    } else {
      alert("Please enter all player names!"); // Alert if any player name is empty
    }
  };

  return (
    <div>
      <h2>Enter Player Names</h2>

      {/* Map through playerCount and display input fields for each player */}
      {Array.from({ length: playerCount }).map((_, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={playerNames[index] || ''}
            onChange={(e) => handlePlayerNameChange(index, e.target.value)}
            placeholder="Enter Your Name" // Placeholder for name input
          />
        </div>
      ))}

      {/* Button to add more players */}
      <button onClick={handleAddPlayer}>Add Player</button>

      {/* Button to start the game */}
      <button onClick={handleStart} style={{ marginTop: '20px' }}>
        Start Game
      </button>
    </div>
  );
}

export default SetupScreen;
