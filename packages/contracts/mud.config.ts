import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    // todo : add a known letters {letter, position} array ??
    Hangman: {
      schema: {
        owner: "bytes32",
        maxAttempts: "uint32",
        solution: "bytes",
        winner: "bytes32", //  by default the server is the winner
        unknown: "uint32",
        known: "uint32"
      }
    },
    CurrentAttempts: "uint32",
    UsedLetters: {
      schema: {
        value1: "bool"
      },
      keySchema: {
        key1: "bytes1",
      }
    },
    KnownLetters: {
      schema: {
        value1: "bytes1"
      },
      keySchema: {
        key1: "uint32",
      },
    },
    Score: "uint32",
  },
  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    }
  ]
});
