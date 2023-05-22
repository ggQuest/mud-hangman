import React from "react";

interface HangmanProps {
  pictures: string[];
}

export const Hangman: React.FC<HangmanProps> = ({ pictures }) => {
  return (
    <div>
      <h3>Hangman</h3>
    </div>
  );
};
