// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Counter } from "../codegen/Tables.sol";

import {Hangman, HangmanData} from "../codegen/tables";
import {addressToEntity} from "../Utils.sol";
import {getUniqueEntity} from "";

contract HangmanSystem is System {

  // setting the attemps and solution in private 
  function setGame(uint32 _maxAttempts) public returns (bytes32 id){
    require(_msgSender()=="", "Not Creator of the game");
    bytes32 owner = addressToEntity(_msgSender());
    id = getuniqueEntity();
    Hangman.set(id, HangmanData({
        owner: owner,
        maxAttempts: _maxAttempts,
        solution: "",
        winner: owner // by default
    }));
    return id;
  }

  function sendScoreReward() internal {

  }

  function guessLetter(uint32 letter) public {
    uint32 val = CurrentAttempts.get();
    uint32 newValue = val + 1;
    CurrentAttempts.set(newValue);
  }

  function guessWord(bytes32 word) public {
    
  }

  function getUsedLetters() external view returns (uint32[] res){
    //alphabet: 0 => 25
    for(uint32 i=0; i<26;) {
        bool isUsed = UsedLetters.get(i);
        if(isUsed) {
            res.push(i);
        }
        unchecked {
            ++i;
        }
    }
    return res;
  }

  function getSolutionLength(gameId) external view returns (uint) {
    bytes32 sender = addressToEntity(_msgSender());
    require(sender==Hangman.getOwner(gameId), "Unauthorized");
    bytes32 sol = Hangman.getSolution(id);
    return sol.length;
  }

}
