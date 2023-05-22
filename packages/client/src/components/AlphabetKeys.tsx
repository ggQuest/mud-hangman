import React from "react";
import { OneKey } from "./OneKey";

interface AlphabetKeysProps {
  alphaBet: string[];
}

export const AlphabetKeys: React.FC<AlphabetKeysProps> = ({ alphaBet }) => {
  return (
    <div>
      <p>Alphabet Keys</p>
      <div>
        {alphaBet.map((letter, index) => (
          <OneKey key={index} letter={letter} />
        ))}
      </div>
    </div>
  );
};
