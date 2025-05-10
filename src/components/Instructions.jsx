import React, { useState } from 'react';

function Instructions() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button className="instructions-button" onClick={toggleModal}>How to Play</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h2>How to Play</h2>
            <p>
              1. Enter the names of the players.
            </p>
            <p>
              2. Click "Start Game" to begin.
            </p>
            <p>
              3. Players will take turns choosing a "Truth" or "Dare".
            </p>
            <p>
              4. If the player skips their turn or doesn't complete the action, they lose a life (indicated by a red bar).
            </p>
            <p>
              5. The game ends when all players have lost their lives.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Instructions;
