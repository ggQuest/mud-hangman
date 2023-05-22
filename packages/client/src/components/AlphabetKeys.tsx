import React from "react";
import { OneKey } from "./OneKey";

interface AlphabetKeysProps {
  alphaBet: string[];
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
}

export const AlphabetKeys: React.FC<AlphabetKeysProps> = ({
  alphaBet,
  lives,
  setLives,
}) => {
  return (
    <div>
      <p>Alphabet Keys</p>
      <div>
        {alphaBet.map((letter, index) => (
          <OneKey
            key={index}
            letter={letter}
            lives={lives}
            setLives={setLives}
          />
        ))}
      </div>
    </div>
  );
};
