import React from "react";

interface OneKeyProps {
  letter: string;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
}

export const OneKey: React.FC<OneKeyProps> = ({ letter, lives, setLives }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("letter: ", letter);
  };
  return (
    <span>
      <button onClick={handleClick}>{letter}</button>
    </span>
  );
};
