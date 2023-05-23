import React from "react";

export const GameOverModal = () => {
  return (
    <div>
      <label htmlFor="my-modal" className="btn">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Game Over! You've been hanged!</h3>
          <p className="py-4">
            You lost all your lives. Better luck next time! Click on "New Game!"
            to start again.
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              New Game!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
