import React from "react";
import { OneKey } from "./OneKey";

interface AlphabetKeysProps {
  alphaBet: string[];
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  randomWord: string[];
}

export const AlphabetKeys: React.FC<AlphabetKeysProps> = ({
  alphaBet,
  lives,
  setLives,
  inputs,
  setInputs,
  randomWord,
}) => {
  return (
    <div>
      <p className="">Alphabet Keys</p>
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
          />
        ))}
      </div>
    </div>
  );
};
