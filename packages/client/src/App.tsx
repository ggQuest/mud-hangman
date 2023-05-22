import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { blockchainWords } from "./blockchainWords.json";
import { useState, useEffect } from "react";
import { HiddenWord } from "./components/HiddenWord";
import { AlphabetKeys } from "./components/AlphabetKeys";
import { Hangman } from "./components/Hangman";

export const App = () => {
  const {
    components: { Counter },
    systemCalls: { increment },
    network: { singletonEntity },
  } = useMUD();
  const counter = useComponentValue(Counter, singletonEntity);

  const alphaBet = [...Array(26)].map(
    (ele, i) => (ele = String.fromCharCode(i + 97))
  );

  const [randomWord, setRandomWord] = useState([""]);
  const [inputs, setInputs] = useState([""]);
  const [lives, setLives] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * blockchainWords.length);
    const randomWord = blockchainWords[randomIndex].split("");
    setRandomWord(randomWord);
    clearInputs(randomWord);
    setResetKey(resetKey + 1);
    setLives(0);
    console.log("randomWord: ", randomWord);
  };
  useEffect(() => {
    getRandomWord();
  }, []);

  const clearInputs = (randomWord: string[]) => {
    const inputs = [...Array(randomWord.length).fill(" _ ")];
    setInputs(inputs);
  };

  return (
    <>
      <div>
        Counter: <span>{counter?.value ?? "??"}</span>
      </div>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await increment());
        }}
      >
        Increment
      </button>
      <button type="button" onClick={getRandomWord}>
        Get Random Word
      </button>
      <AlphabetKeys
        key={resetKey}
        alphaBet={alphaBet}
        lives={lives}
        setLives={setLives}
        inputs={inputs}
        setInputs={setInputs}
        randomWord={randomWord}
      />
      <HiddenWord randomWord={randomWord} inputs={inputs} />
      <Hangman lives={lives} />
    </>
  );
};
