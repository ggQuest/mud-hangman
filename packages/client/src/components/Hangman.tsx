import React from "react";

export const Hangman: React.FC = () => {
  const pictures = [...Array(7)].map(
    (ele, i) => (ele = "./images/hangman" + i + ".jpg")
  );
  return (
    <div>
      <h3>Hangman</h3>
    </div>
  );
};
