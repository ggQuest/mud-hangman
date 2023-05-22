import React from "react";
import { useState } from "react";

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
  const [keyColor, setKeyColor] = useState("white");
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("lives: ", lives);

    if (inputs.some((input) => input === " _ ") && lives < 7) {
      if (randomWord.some((randomLetter) => randomLetter === letter)) {
        const newInputs = inputs.map((input, index) => {
          if (randomWord[index] === letter) {
            return letter;
          } else {
            return input;
          }
        });
        //set the key color yellow
        setKeyColor("yellow");
        setInputs(newInputs);
      } else {
        //set the key color red
        setKeyColor("red");
        setLives(lives + 1);
        console.log("lives: ", lives);
      }
    }
  };

  return (
    <span>
      <button style={{ backgroundColor: keyColor }} onClick={handleClick}>
        {letter}
      </button>
    </span>
  );
};
