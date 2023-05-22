import React from "react";

interface HiddenWordProps {
  randomWord: string[];
  inputs: string[];
}

export const HiddenWord: React.FC<HiddenWordProps> = ({
  randomWord,
  inputs,
}) => {
  return (
    <div>
      <p>HiddenWord:</p>
      <div>
        {inputs.map((input, index) => (
          <span key={index}>{input}</span>
        ))}
      </div>
    </div>
  );
};
