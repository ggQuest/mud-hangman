import React from "react";
import { OneKey } from "./OneKey";

interface AlphabetKeysProps {
  alphaBet: string[];
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  randomWord?: string[];
  getRandomWord?: () => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export const AlphabetKeys: React.FC<AlphabetKeysProps> = ({
  alphaBet,
  lives,
  setLives,
  inputs,
  setInputs,
  randomWord,
  getRandomWord,
  setScore,
}) => {
  return (
    <div>
      {alphaBet.map((letter, index) => (
        <OneKey
          key={index}
          letter={letter}
          lives={lives}
          setLives={setLives}
          inputs={inputs}
          setInputs={setInputs}
          randomWord={randomWord}
          getRandomWord={getRandomWord}
          setScore={setScore}
        />
      ))}
    </div>
  );
};
