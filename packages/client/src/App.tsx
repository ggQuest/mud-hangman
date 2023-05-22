import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { blockchainWords } from "./blockchainWords.json";

export const App = () => {
  const {
    components: { Counter },
    systemCalls: { increment },
    network: { singletonEntity },
  } = useMUD();
  const counter = useComponentValue(Counter, singletonEntity);

  const randomWord = () => {
    const randomIndex = Math.floor(Math.random() * blockchainWords.length);
    return blockchainWords[randomIndex].split("");
  };

  console.log("randomWord: ", randomWord());

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
    </>
  );
};
