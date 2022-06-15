// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Vesting is Ownable {
    using SafeMath for uint256;

    IERC20 GeniusToken;
    uint256 public totalClaimPeriod = 5;
    uint256 public percentReleasePerPeriod = 20; // 20 percent
    uint256 startTime;
    // uint256 yearCalc = 31556952; //Year in seconds
    uint256 yearCalc = 60; //for testing
    struct User {
        uint256 total;
        uint256 claimed;
        uint256 time;
    }

    mapping(address => User) public userInfo;

    constructor(
        IERC20 _token,
        address[] memory holders,
        uint256[] memory vestingAmount //in Millions
    ) {
        GeniusToken = _token;
        startTime = block.timestamp;

        //holders[0] = Company Reserve  //vestingAmount[0] = 494*10^6
        //holders[1] = Founders & Team  //vestingAmount[1] = 312*10^6
        //holders[2] = Existing GGEMs Holders  //vestingAmount[2] = 312*10^6

        for (uint256 i = 0; i < 3; i++) {
            userInfo[holders[i]].total = vestingAmount[i] * 10**6 * 10**8;
            userInfo[holders[i]].time = startTime;
        }
    }

    function claimableAmount(address _user) public view returns (uint256) {
        User memory user = userInfo[_user];
        uint256 claimAmount;
        uint256 claimPeriod = ((block.timestamp.sub(startTime)).div(yearCalc));
        if (claimPeriod < 1) return 0;
        if (claimPeriod <= totalClaimPeriod) {
            claimAmount = (user.total).mul(claimPeriod).div(totalClaimPeriod);
            return claimAmount.sub(user.claimed);
        } else return user.total.sub(user.claimed);
    }

    function claim(address _user) public {
        require(
            block.timestamp > startTime + yearCalc,
            "Lockperiod is not over"
        );
        require(
            userInfo[_user].claimed < userInfo[_user].total,
            "All rewards already claimed"
        );
        uint256 amount = claimableAmount(_user);
        userInfo[_user].claimed += amount;
        GeniusToken.transfer(_user, amount);
    }

    function vestingBalance() public view returns (uint256) {
        return GeniusToken.balanceOf(address(this));
    }
}
