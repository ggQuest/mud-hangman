import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

const entityToBytes32 = (entity: string) => {
  return '0x' + entity.replace("0x", "").padStart(64,"0");
}
export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  components: ClientComponents
) {

  // only our server can call it to set up the game
  const setGame = async (maxAttempts: number) => {
    const tx = await worldSend("setGame", [maxAttempts]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  }
  const guessLetter = async (l: number) => {
    const tx = await worldSend("guessLetter", [l]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  }

  const guessWord = async (word: string) => {
    const tx = await worldSend("guessWord", [word]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  }

  const getSolutionLength = async (id: string) => {
    const tx = await worldSend("getSolutionLength", [entityToBytes32(id)]);
    //return tx.;
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  }
  
  const getUsedLetters = async () => {
    const tx = await worldSend("getUsedLetters", []);
    //return tx.;
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  }


  return {
    guessLetter,
    guessWord,
    getSolutionLength,
    getUsedLetters,
    setGame
  };
}
