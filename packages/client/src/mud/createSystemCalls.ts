import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

const entityToBytes32 = (entity: string) => {
  return '0x' + entity.replace("0x", "").padStart(64,"0");
}

const entityToBytes1 = (entity: string) => {
  return '0x' + entity.replace("0x", "").padStart(2,"0");
}

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  components: ClientComponents
) {

  // only our server can call it to set up the game
  const setGame = async (maxAttempts: number) => {
    const tx = await worldSend("setGame", [maxAttempts, { gasLimit: 25000000 }]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  }

  const guessLetter = async (letter: string) => {
    const tx = await worldSend("guessLetter", [entityToBytes1(letter), { gasLimit: 25000000 }]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  }

  const guessWord = async (word: string) => {
    const tx = await worldSend("guessWord", [word, { gasLimit: 25000000 }]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  }

  const getSolutionLength = async (id: string) => {
    const tx = await worldSend("getSolutionLength", [entityToBytes32(id), { gasLimit: 25000000 }]);
    //return tx.;
  }
  
  const getKnownLetters = async () => {
    //const tx = await worldSend("getUsedLetters", []);
    //return tx.;
  }

  const getCurrentAttempts = async () => {
    const tx = await worldSend("getCurrentAttempts", []);
  }

  const getCurrentScore = async () => {
    const tx = await worldSend("getCurrentScore", []);
  }


  return {
    guessLetter,
    guessWord,
    getSolutionLength,
    getKnownLetters,
    setGame,
    getCurrentAttempts,
    getCurrentScore
  };
}










