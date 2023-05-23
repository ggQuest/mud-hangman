
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Counter } from "../codegen/Tables.sol";

import {Hangman, HangmanData, CurrentAttempts, UsedLetters, KnownLetters, Score} from "../codegen/Tables.sol";
import {addressToEntity} from "../Utils.sol";
import {getUniqueEntity} from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

contract HangmanSystem is System {
    event partyWon();
    event partyLost();

  // setting the attemps and solution in private 
  function setGame(uint32 _maxAttempts) public returns (bytes32 id){
    //require(_msgSender() == address(0x0), "Not Creator of the game");
    bytes32 owner = addressToEntity(_msgSender());
    id = getUniqueEntity();
    bytes memory _solution = "blockchain"; // TODO: gen randomly a word
    Hangman.set(id, HangmanData({
        owner: owner,
        maxAttempts: _maxAttempts,
        solution: _solution,
        winner: owner, // by default
        unknown: uint32(_solution.length), //how many letters arent found
        known: 0
    }));
    return id;
  }


    // check if letter has been already used and if no then check if it exists in the word
    // returns number of positions if the letter is found in the word
  function guessLetter(bytes1 letter) public returns(uint) {
    bytes32 owner = addressToEntity(_msgSender());
    uint32 val = CurrentAttempts.get(owner);
    uint32 maxAttempts = Hangman.getMaxAttempts(getUniqueEntity());
    require(val <= maxAttempts, "You wasted all your lives !");

    bool isUsed = UsedLetters.get(letter);
    require(!isUsed, "letter already used");

    bytes memory solution = Hangman.getSolution(getUniqueEntity());

    uint32 positions = 0;
    bool exists = false;
    uint j = 0;
    //check if it exists
    for (uint32 m = 0; m < solution.length;) {
        if (solution[m] == letter) {
            //if they got a character correct
            KnownLetters.set(m, letter);
            uint32 known = Hangman.getKnown(getUniqueEntity());
            Hangman.setKnown(getUniqueEntity(), known + 1);
            exists = true;
            unchecked {
                ++positions;
                ++j;
            }
        }
        unchecked {
            ++m;
        }
    }
    if(!exists) {
        // case where the letter doesnt exist in the word;
        uint32 newValue = val + 1;
        CurrentAttempts.set(owner, newValue);
        if(newValue >= maxAttempts) {
            emit partyLost();
        }
        return 0;
    }
    
    //check if the word has been found thus finshing the party
    uint32 sizeUnknown = Hangman.getUnknown(getUniqueEntity());
    uint32 sizeKnown = Hangman.getKnown(getUniqueEntity());
    Hangman.setUnknown(getUniqueEntity(), sizeUnknown - positions);
    if(sizeUnknown - sizeKnown == 0) {
        uint32 score = Score.get(owner);
        Score.set(owner, score + 1);
        emit partyWon();
    }


    UsedLetters.set(letter, true);

    return positions;
    
  }

  function guessWord(bytes memory word) public {
    
  }

  function getKnownLetters() public returns (bytes1[] memory) {
    bytes memory solution = Hangman.getSolution(getUniqueEntity());
    uint length = solution.length;
    bytes1[] memory ret = new bytes1[](length);
    for(uint32 i=0; i<length;) {
        bytes1 letter = KnownLetters.get(i);
        ret[i] = letter;
        unchecked {
            ++i;
        }
    }
    return ret;
  }
  
  function getUsedLetters() external view returns (bytes1[] memory){
    //alphabet: 0 => 25
    /*bytes1[] memory ret = new bytes1[](26);
    uint j = 0;
    for(uint32 i=0; i<26;) {
        bool isUsed = UsedLetters.get(i);
        if(isUsed) {
            ret[j] = i;
            unchecked {
                ++j;
            }
        }
        unchecked {
            ++i;
        }
    }
    return ret;*/
  }

  function getSolutionLength(bytes32 gameId) external view returns (uint) {
    bytes32 sender = addressToEntity(_msgSender());
    require(sender==Hangman.getOwner(gameId), "Unauthorized");
    bytes memory sol = Hangman.getSolution(gameId);
    return sol.length;
  }

}
