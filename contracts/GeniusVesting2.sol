// // SPDX-License-Identifier: UNLICENSED

// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "hardhat/console.sol";

// contract Vesting is Ownable {
//     using SafeMath for uint256;

//     IERC20 GeniusToken;

//     uint256 public totalAmount;
//     uint256 public totalClaimPeriod = 5;
//     uint256 public percentReleasePerPeriod = 20; // 20 percent
//     uint256 startTime;
//     uint256 yearCalc = 31556952;

//     struct User {
//         uint256 total;
//         uint256 claimed;
//         uint256 time;
//     }

//     mapping(address => User) public userInfo;

//     constructor(
//         IERC20 _token,
//         address[] memory holders,
//         uint256[] memory vestingAmount //in Millions
//     ) {
//         GeniusToken = _token;
//         startTime = block.timestamp;

//         // for(uint i=0; i<3 ;i++){
//         //     User memory user = userInfo[holders[i]];
//         //     user.total = vestingAmount[i];
//         //     user.time = startTime;
//         // }

//         //holders[0] = Company Reserve  //vestingAmount[0] = 494*10^6
//         userInfo[holders[0]].total = vestingAmount[0];
//         userInfo[holders[0]].time = startTime;

//         //holders[1] = Founders & Team  //vestingAmount[1] = 312*10^6
//         userInfo[holders[1]].total = vestingAmount[1];
//         userInfo[holders[1]].time = startTime;

//         //holders[2] = Existing GGEMs Holders  //vestingAmount[2] = 312*10^6
//         userInfo[holders[2]].total = vestingAmount[2];
//         userInfo[holders[2]].time = startTime;
//     }

//     function claimableAmount(address _user) public view returns (uint256) {
//         User memory user = userInfo[_user];
//         uint256 claimAmount;
//         uint256 claimPeriod = ((block.timestamp.sub(startTime)).div(yearCalc));
//         if (claimPeriod < 1) return 0;
//         if (claimPeriod >= 1 && claimPeriod <= 5) {
//             claimAmount = (user.total).div(5).mul(claimPeriod);
//             user.total -= claimAmount;
//             return claimAmount;
//         } else return user.total;
//     }

//     function claim(address _user) public {
//         require(
//             block.timestamp > startTime + yearCalc,
//             "Lockperiod is not over"
//         );
//         require(
//             userInfo[_user].claimed < userInfo[_user].total,
//             "All rewards already claimed"
//         );
//         uint256 amount = claimableAmount(_user);
//         userInfo[_user].claimed += amount;
//         console.log("Amount claimed:   ", amount);
//         GeniusToken.transfer(_user, amount);
//     }

//     function vestingBalance() public view returns (uint256) {
//         return GeniusToken.balanceOf(address(this));
//     }
// }
