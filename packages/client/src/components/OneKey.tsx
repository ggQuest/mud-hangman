import React from "react";
import { useState } from "react";

interface OneKeyProps {
  letter: string;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  randomWord: string[];
  getRandomWord: () => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export const OneKey: React.FC<OneKeyProps> = ({
  letter,
  lives,
  setLives,
  inputs,
  setInputs,
  randomWord,
  getRandomWord,
  setScore,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputs.some((input) => input === " _ ") && lives < 7 && !isClicked) {
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
        if (!newInputs.includes(" _ ")) {
          //call function guessWord
          setScore((score) => score + 1);
          getRandomWord();
        }
      } else {
        setIsCorrectGuess(false);
        setLives(lives + 1);
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
