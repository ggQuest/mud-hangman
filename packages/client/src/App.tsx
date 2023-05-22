import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { blockchainWords } from "./blockchainWords.json";
import { useState } from "react";

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

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * blockchainWords.length);
    const randomWord = blockchainWords[randomIndex].split("");
    setRandomWord(randomWord);
    clearInputs(randomWord);
    console.log("randomWord: ", randomWord);
  };

  const clearInputs = (randomWord) => {
    const inputs = [...Array(randomWord.length).fill(" _ ")];
    setInputs(inputs);
    console.log("inputs: ", inputs);
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
    </>
  );
};
