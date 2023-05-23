// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

// Import schema type
import { SchemaType } from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { PackedCounter, PackedCounterLib } from "@latticexyz/store/src/PackedCounter.sol";

bytes32 constant _tableId = bytes32(abi.encodePacked(bytes16(""), bytes16("UsedLetters")));
bytes32 constant UsedLettersTableId = _tableId;

library UsedLetters {
  /** Get the table's schema */
  function getSchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](1);
    _schema[0] = SchemaType.BOOL;

    return SchemaLib.encode(_schema);
  }

  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](2);
    _schema[0] = SchemaType.BYTES32;
    _schema[1] = SchemaType.BYTES1;

    return SchemaLib.encode(_schema);
  }

  /** Get the table's metadata */
  function getMetadata() internal pure returns (string memory, string[] memory) {
    string[] memory _fieldNames = new string[](1);
    _fieldNames[0] = "value1";
    return ("UsedLetters", _fieldNames);
  }

  /** Register the table's schema */
  function registerSchema() internal {
    StoreSwitch.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Register the table's schema (using the specified store) */
  function registerSchema(IStore _store) internal {
    _store.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Set the table's metadata */
  function setMetadata() internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    StoreSwitch.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Set the table's metadata (using the specified store) */
  function setMetadata(IStore _store) internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    _store.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Get value1 */
  function get(bytes32 key1, bytes1 key2) internal view returns (bool value1) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32((key1));
    _keyTuple[1] = bytes32((key2));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 0);
    return (_toBool(uint8(Bytes.slice1(_blob, 0))));
  }

  /** Get value1 (using the specified store) */
  function get(IStore _store, bytes32 key1, bytes1 key2) internal view returns (bool value1) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32((key1));
    _keyTuple[1] = bytes32((key2));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 0);
    return (_toBool(uint8(Bytes.slice1(_blob, 0))));
  }

  /** Set value1 */
  function set(bytes32 key1, bytes1 key2, bool value1) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32((key1));
    _keyTuple[1] = bytes32((key2));

    StoreSwitch.setField(_tableId, _keyTuple, 0, abi.encodePacked((value1)));
  }

  /** Set value1 (using the specified store) */
  function set(IStore _store, bytes32 key1, bytes1 key2, bool value1) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32((key1));
    _keyTuple[1] = bytes32((key2));

    _store.setField(_tableId, _keyTuple, 0, abi.encodePacked((value1)));
  }

  /** Tightly pack full data using this table's schema */
  function encode(bool value1) internal view returns (bytes memory) {
    return abi.encodePacked(value1);
  }

  /** Encode keys as a bytes32 array using this table's schema */
  function encodeKeyTuple(bytes32 key1, bytes1 key2) internal pure returns (bytes32[] memory _keyTuple) {
    _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32((key1));
    _keyTuple[1] = bytes32((key2));
  }

  /* Delete all data for given keys */
  function deleteRecord(bytes32 key1, bytes1 key2) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32((key1));
    _keyTuple[1] = bytes32((key2));

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /* Delete all data for given keys (using the specified store) */
  function deleteRecord(IStore _store, bytes32 key1, bytes1 key2) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32((key1));
    _keyTuple[1] = bytes32((key2));

    _store.deleteRecord(_tableId, _keyTuple);
  }
}

function _toBool(uint8 value) pure returns (bool result) {
  assembly {
    result := value
  }
}
