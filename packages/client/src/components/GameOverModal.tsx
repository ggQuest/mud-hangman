import React from "react";

interface GameOverModalProps {
  gameOver: boolean;
  newGame: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  gameOver,
  newGame,
}) => {
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={gameOver}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Game Over! You've been hanged!</h3>
          <p className="py-4">
            You lost all your lives. Better luck next time! Click on "NEW GAME!"
            to start again.
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn" onClick={newGame}>
              New Game!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
