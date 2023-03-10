// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    uint256 public value;

    event ValueChanged(uint256 newValue);

    function store(uint256 _value) public onlyOwner {
        value = _value;
        emit ValueChanged(_value);
    }

    function retrieve() public view returns (uint256) {
        return value;
    }
}
