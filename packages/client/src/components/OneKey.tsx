import React, { useState } from "react";
import { useMUD } from "../MUDContext";

interface OneKeyProps {
  letter: string;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
  randomWord?: string[];
  getRandomWord?: () => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}
type Event = React.MouseEvent<HTMLButtonElement>;

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

  const {
    systemCalls: { getKnownLetters, guessLetter},
    components: {Hangman}
  } = useMUD();
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputs.some((input) => input === " _ ") && lives < 7 && !isClicked) {
      setIsClicked(true);
      if (randomWord!.some((randomLetter) => randomLetter === letter)) {
        setIsCorrectGuess(true);
        const newInputs = inputs.map((input, index) => {
          if (randomWord![index] === letter) {
            return letter;
          } else {
            return input;
          }
        });

        setInputs(newInputs);
        if (!newInputs.includes(" _ ")) {
          //call function guessWord
          setScore((score) => score + 1);
          getRandomWord!();
        }
      } else {
        setIsCorrectGuess(false);
        setLives(lives + 1);
      }
    }
  };

  const handleGuessLetter = async (e: Event) => {
    try {
      e.preventDefault();
      setIsClicked(true);
      // call the contract func guessLetter
      const positionsNumber = await guessLetter(letter);
      if(positionsNumber as unknown as number == 0) {
        setIsCorrectGuess(false);
      }else{
        setIsCorrectGuess(true);
        // get the known letters from player
        try {
          const newLetters = await getKnownLetters();
          const newLettersInputs = (newLetters as unknown as string[]).map((value) => {
            if(value === undefined || value === "" || value === null) {
              return "";
            }else{
              return value;
            }
          })
          setInputs(newLettersInputs);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  let buttonClass =
    "btn btn-outline btn-primary btn-sm m-1 font-bold shadow-lg";
  if (isClicked) {
    buttonClass = isCorrectGuess
      ? "btn btn-success btn-sm m-1 font-bold shadow-lg"
      : "btn btn-error btn-sm m-1 font-bold shadow-lg";
  }
  return (
    <span>
      <button className={buttonClass} onClick={handleGuessLetter}>
        {letter}
      </button>
    </span>
  );
};
