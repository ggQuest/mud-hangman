import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Hangman: {
      schema: {
        owner: "bytes32",
        maxAttempts: "uint32",
        solution: "bytes32",
        winner: "bytes32" //  by default the server is the winner
      }
    },
    CurrentAttempts: "uint32",
    UsedLetters: {
      schema: {
        value1: "bool"
      },
      keySchema: {
        key1: "uint256",
      }
    },
    Score: "uint256",
  },
  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    }
  ]
});