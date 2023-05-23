import React from "react";

interface HangmanProps {
  lives: number;
}

export const Hangman: React.FC<HangmanProps> = ({ lives }) => {
  const pictures = [...Array(8)].map(
    (ele, i) => (ele = "/images/hangman" + i + ".jpg")
  );

  return (
    <div className="flex flex-col  items-center">
      <img
        className="my-5 rounded-md shadow-lg"
        width={"500 px"}
        src={pictures[lives]}
        alt="hangman"
      />
    </div>
  );
};
