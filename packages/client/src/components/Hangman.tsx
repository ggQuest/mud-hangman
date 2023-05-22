import React from "react";

interface HangmanProps {
  lives: number;
}

export const Hangman: React.FC<HangmanProps> = ({ lives }) => {
  const pictures = [...Array(8)].map(
    (ele, i) => (ele = "/images/hangman" + i + ".jpg")
  );

  return (
    <div>
      <p>Hangman</p>
      <div>
        <img src={pictures[lives]} alt="hangman" />
      </div>
    </div>
  );
};
