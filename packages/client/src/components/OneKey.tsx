import React from "react";
import { useState } from "react";

interface OneKeyProps {
  letter: string;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  randomWord: string[];
  getrandomWord: () => void;
  setscore: React.Dispatch<React.SetStateAction<number>>;
}

export const OneKey: React.FC<OneKeyProps> = ({
  letter,
  lives,
  setLives,
  inputs,
  setInputs,
  randomWord,
  getrandomWord,
  setscore,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("lives: ", lives);

    if (inputs.some((input) => input === " _ ") && lives < 7) {
      setIsClicked(true);
      if (randomWord.some((randomLetter) => randomLetter === letter)) {
        setIsCorrectGuess(true);
        const newInputs = inputs.map((input, index) => {
          if (randomWord[index] === letter) {
            return letter;
          } else {
            return input;
          }
        });

        setInputs(newInputs);
      } else {
        setIsCorrectGuess(false);
        setLives(lives + 1);
        console.log("lives: ", lives);
      }
    }
  };

  let buttonClass =
    "btn btn-outline btn-primary btn-sm m-1 font-bold shadow-lg";
  if (isClicked) {
    buttonClass = isCorrectGuess
      ? "btn btn-success btn-sm m-1 font-bold shadow-lg"
      : "btn btn-error btn-sm m-1 font-bold shadow-lg";
  }
  return (
    <span>
      <button className={buttonClass} onClick={handleClick}>
        {letter}
      </button>
    </span>
  );
};
