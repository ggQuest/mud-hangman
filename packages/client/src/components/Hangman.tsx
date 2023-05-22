import React from "react";

interface HangmanProps {
  lives: number;
}

export const Hangman: React.FC<HangmanProps> = ({ lives }) => {
  const pictures = [...Array(7)].map(
    (ele, i) => (ele = "/images/hangman" + i + ".jpg")
  );

  return (
    <div>
      <h3>Hangman</h3>
      <div>
        <img src={pictures[lives]} alt="hangman" />
      </div>
    </div>
  );
};
