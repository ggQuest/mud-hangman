import React from "react";

interface OneKeyProps {
  letter: string;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  randomWord: string[];
}

export const OneKey: React.FC<OneKeyProps> = ({
  letter,
  lives,
  setLives,
  inputs,
  setInputs,
  randomWord,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("letter: ", letter);
    console.log("lives: ", lives);
    console.log("inputs: ", inputs);
    if (inputs.some((input) => input === " _ ") && lives < 7) {
      if (randomWord.some((randomLetter) => randomLetter === letter)) {
        const newInputs = inputs.map((input, index) => {
          if (randomWord[index] === letter) {
            return letter;
          } else {
            return input;
          }
        });
        setInputs(newInputs);
      } else {
        setLives(lives + 1);
      }
    }
  };

  return (
    <span>
      <button onClick={handleClick}>{letter}</button>
    </span>
  );
};
