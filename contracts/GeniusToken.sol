//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GeniusToken is ERC20, Ownable {

    constructor(
        address[] memory _address,
        uint256[] memory _amount,
        address ownershipWallet
    ) ERC20("GeniusEducationMerit", "GGEM") {
        _transferOwnership(ownershipWallet);

        //_address[0] = Foundation Reserve  _amount[0] = 494
        _mint(_address[0], (_amount[0] * 10**6) * 10**8);

        //_address[1] = earlyHolders     _amount[1] = 338
        _mint(_address[1], (_amount[1] * 10**6) * 10**8);

        //_address[2] = launchEarnings     _amount[2] = 156
        _mint(_address[2], (_amount[2] * 10**6) * 10**8);

        //_address[3] = inWorldPurchase     _amount[3] = 494
        _mint(_address[3], (_amount[3] * 10**6) * 10**8);

        _mint(msg.sender, (1118 * 10**6) * 10**8);
    }

    function burn(address from, uint256 _amount) public {
        _burn(from, _amount);
    }

    function decimals() public pure override returns (uint8) {
        return 8;
    }
}
