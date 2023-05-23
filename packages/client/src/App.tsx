import { useEntityQuery } from "@latticexyz/react";
import { Has, getComponentValueStrict } from "@latticexyz/recs";
import { useEffect, useState } from "react";
import { useMUD } from "./MUDContext";
import { AlphabetKeys } from "./components/AlphabetKeys";
import { GameOverModal } from "./components/GameOverModal";
import { HangmanComponent } from "./components/Hangman";
import { HiddenWord } from "./components/HiddenWord";
import { Navbar } from "./components/Navbar";

export const App = () => {
  const {
    systemCalls: { setGame, getCurrentAttempts, getCurrentScore},
    components: {Hangman}
  } = useMUD();
  // const counter = useComponentValue(Counter, singletonEntity);

  //ids to get all gameIds from blockchain
  const hangmanIds = useEntityQuery([Has(Hangman)])

  const alphaBet = [...Array(26)].map(
    (ele, i) => (ele = String.fromCharCode(i + 97))
  );
  
  const [gameId, setGameId] = useState("");
  const [randomWord, setRandomWord] = useState([""]);
  const [inputs, setInputs] = useState([""]);
  const [lives, setLives] = useState(0);
  const [maxLives, setMaxLives] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [solutionLength, setSolutionLength] = useState(0);
  const [solution, setSolution] = useState("");

  /*const newGame = () => { 
    getRandomWord();
    setLives(0);
    setScore(0);
    setGameOver(false);
  };*/

  //set the game one time (to initialize the game)
  const callSetGame = async () => {
    await setGame(7);
    //setGameId(id as unknown as string);
  }

  const getStringFromBytes = (sol: string) => {
    // Split the hexadecimal string into pairs of characters
    const hexPairs = sol.match(/.{1,2}/g);

    // Convert each pair of hexadecimal characters to its decimal value
    const decimalArray = hexPairs!.map(hex => parseInt(hex, 16));

    // Create a Uint8Array from the decimal values
    const byteArray = new Uint8Array(decimalArray);

    // Convert the byte array to a string
    const decoder = new TextDecoder();
    const stringValue = decoder.decode(byteArray);
    return stringValue;
  }
 
  // we get the current gameId and basic info
  useEffect(() => {
    try {
      const id = hangmanIds[hangmanIds.length-1];
      setGameId(id);
      const hangmanData = getComponentValueStrict(Hangman,id);
      const sol = hangmanData.solution;
      const stringValue = getStringFromBytes(sol);
      setSolution(stringValue);
      setSolutionLength(stringValue.length);
      setMaxLives(hangmanData.maxAttempts);
    } catch (error) {
        console.log("error is "+ error);
    }
  }, [hangmanIds, Hangman])

  // it only gets fetched once
  //TODO; fetch the current score for the user
  useEffect(() => {
    getCurrentScore().then((resp) => setScore(resp as unknown as number))
  }, [getCurrentScore])

  //Todo: FETCH CURRRENTattempts
  useEffect(() => {
    getCurrentAttempts().then((resp) => setLives(maxLives - (resp as unknown as number) ))
  }, [getCurrentAttempts, maxLives])

  /*  
  // Get the solution length of the word we used
  useEffect(() => {
    getSolutionLength(gameId).then((resp) => setSolutionLength(resp as unknown as number));
  }, [gameId, getSolutionLength])

  // Get the max attempts or lives from the chain
  useEffect(() => {
    getMaxAttempts(gameId).then((resp) => setLives(resp as unknown as number))
  }, [gameId, getMaxAttempts])
  */

  /*useEffect(() => {
    if (lives >= 7) {
      setGameOver(true);
    }
  }, [lives]);
  */

  const getRandomWord = () => {
    //const randomIndex = Math.floor(Math.random() * blockchainWords.length);
    //const randomWord = blockchainWords[randomIndex].toLowerCase().split("");
    const randomWord = ["blockchain"];
    setRandomWord(randomWord);
    clearInputs(randomWord);
    setResetKey(resetKey + 1);
    setLives(0);
    setGameOver(false);
    console.log("randomWord: ", randomWord);
  };

  /*useEffect(() => {
    getRandomWord();
  }, []);*/

  const clearInputs = (randomWord: string[]) => {
    const inputs = [...Array(randomWord.length).fill(" _ ")];
    setInputs(inputs);
  };
  console.log('SOLUTION IS : '+ solution);

  console.log('SOLUTION LENGTH IS : '+ solutionLength);
  
  return (
    <>
      {/* <div>
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
      </button> */}
      <div className="h-screen overflow-hidden">
        <Navbar score={score} lives={lives} />
        <div className="hero h-screen bg-base-200 ">
          <div className="hero-content text-center p-0">
            <div className="max-w-md">
              <button
                className="btn btn-primary mb-5 shadow-lg"
                onClick={callSetGame}
              >
                New Game
              </button>
              <GameOverModal gameOver={gameOver} newGame={callSetGame} />
              <AlphabetKeys
                key={resetKey}
                alphaBet={alphaBet}
                lives={lives}
                setLives={setLives}
                inputs={inputs}
                setInputs={setInputs}
                randomWord={randomWord}
                setScore={setScore}
                getRandomWord={getRandomWord}
              />
              <HiddenWord randomWord={randomWord} inputs={inputs} />
              <HangmanComponent lives={lives} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
