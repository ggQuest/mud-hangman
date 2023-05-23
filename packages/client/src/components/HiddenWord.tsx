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
      <p className=" text-xl my-5 font-medium">Guess the word 😉</p>
      <div className="text-5xl font-extrabold">
        {inputs.map((input, index) => (
          <span key={index}>{input}</span>
        ))}
      </div>
    </div>
  );
};
