// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract MyToken is ERC20Votes {
    uint256 public s_maxSupply = 1000000 * (10 ** 18);

    constructor() ERC20("MyToken", "MT") ERC20Permit("MyToken") {
        _mint(msg.sender, s_maxSupply);
    }

    function afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function burn(address account, uint256 amount) internal {
        super._burn(account, amount);
    }
}
