import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import { BigNumber } from "ethers";
import {
  GeniusToken,
  GeniusToken__factory,
  Vesting,
  Vesting__factory,
} from "../typechain";

describe("Vesting tests", () => {
  let owner: SignerWithAddress;
  let signers: SignerWithAddress[];
  let vesting: Vesting;
  let token: GeniusToken;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    owner = await signers[0];
    token = await new GeniusToken__factory(owner).deploy(
      [
        signers[1].address,
        signers[2].address,
        signers[3].address,
        signers[4].address,
      ],
      [494, 338, 156, 494],
      signers[0].address
    );
    vesting = await new Vesting__factory(owner).deploy(
      token.address,
      [signers[5].address, signers[6].address, signers[7].address],
      [494, 312, 312]
    );
    let ownerBalance = await token.balanceOf(owner.address);
    await token.connect(owner).transfer(vesting.address, ownerBalance);
  });

  it("Checks the deployed token", async () => {
    console.log("Total supply of token:", +(await token.totalSupply()));
    console.log("Vesting contract token balance", +(await token.balanceOf(vesting.address)) );

    let user = await vesting.userInfo(signers[5].address);
    console.log("Total vested amount for signer[5]", Number(user.total));
    console.log(
      "Claimable amount for signer[5] before lockperiod",
      +(await vesting.claimableAmount(signers[5].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[5] after 60 sec",
      +(await vesting.claimableAmount(signers[5].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[5] after 120 sec",
      +(await vesting.claimableAmount(signers[5].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[5] after 180 sec",
      +(await vesting.claimableAmount(signers[5].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[5] after 240 sec",
      +(await vesting.claimableAmount(signers[5].address))
    );

    await vesting.connect(owner).claim(signers[5].address);
    user = await vesting.userInfo(signers[5].address);
    console.log(
      "Claimed amount left after claiming at 240s for signer[5]",
      Number(user.claimed)
    );
    console.log(
      "Claimable amount left after claiming at 240 sec",
      +(await vesting.claimableAmount(signers[5].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[5] after 300 sec",
      +(await vesting.claimableAmount(signers[5].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[5] after 360 sec",
      +(await vesting.claimableAmount(signers[5].address))
    );

    await vesting.connect(owner).claim(signers[5].address);

    user = await vesting.userInfo(signers[5].address);
    console.log(
      "Total Claimed amount after claiming at 360s for signer[5]",
      Number(user.claimed)
    );
    console.log(
      "Claimable amount for signer[5] after claiming at 360 sec",
      +(await vesting.claimableAmount(signers[5].address))
    );
  });

  it("Checks the deployed token", async () => {
    console.log("Total supply of token:", +(await token.totalSupply()));
    console.log("Vesting contract token balance", +(await token.balanceOf(vesting.address)) );
    
    let user = await vesting.userInfo(signers[6].address);
    console.log("Total vested amount for signer[6]", Number(user.total));
    console.log(
      "Claimable amount for signer[6] before lockperiod",
      +(await vesting.claimableAmount(signers[6].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[6] after 60 sec",
      +(await vesting.claimableAmount(signers[6].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[6] after 120 sec",
      +(await vesting.claimableAmount(signers[6].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[6] after 180 sec",
      +(await vesting.claimableAmount(signers[6].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[6] after 240 sec",
      +(await vesting.claimableAmount(signers[6].address))
    );

    await vesting.connect(owner).claim(signers[6].address);
    user = await vesting.userInfo(signers[6].address);
    console.log(
      "Claimed amount left after claiming at 240s for signer[6]",
      Number(user.claimed)
    );
    console.log(
      "Claimable amount left after claiming at 240 sec",
      +(await vesting.claimableAmount(signers[6].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[6] after 300 sec",
      +(await vesting.claimableAmount(signers[6].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[6] after 360 sec",
      +(await vesting.claimableAmount(signers[6].address))
    );

    await vesting.connect(owner).claim(signers[6].address);

    user = await vesting.userInfo(signers[6].address);
    console.log(
      "Total Claimed amount after claiming at 360s for signer[6]",
      Number(user.claimed)
    );
    console.log(
      "Claimable amount for signer[6] after claiming at 360 sec",
      +(await vesting.claimableAmount(signers[6].address))
    );
  });
  it("Checks the deployed token", async () => {
    console.log("Total supply of token:", +(await token.totalSupply()));
    console.log("Vesting contract token balance", +(await token.balanceOf(vesting.address)) );
    
    let user = await vesting.userInfo(signers[7].address);
    console.log("Total vested amount for signer[7]", Number(user.total));
    console.log(
      "Claimable amount for signer[7] before lockperiod",
      +(await vesting.claimableAmount(signers[7].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[7] after 60 sec",
      +(await vesting.claimableAmount(signers[7].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[7] after 120 sec",
      +(await vesting.claimableAmount(signers[7].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[7] after 180 sec",
      +(await vesting.claimableAmount(signers[7].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[7] after 240 sec",
      +(await vesting.claimableAmount(signers[7].address))
    );

    await vesting.connect(owner).claim(signers[7].address);
    user = await vesting.userInfo(signers[7].address);
    console.log(
      "Claimed amount left after claiming at 240s for signer[7]",
      Number(user.claimed)
    );
    console.log(
      "Claimable amount left after claiming at 240 sec",
      +(await vesting.claimableAmount(signers[7].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[7] after 300 sec",
      +(await vesting.claimableAmount(signers[7].address))
    );
    await network.provider.send("evm_increaseTime", [60]);
    await network.provider.send("evm_mine");

    console.log(
      "Claimable amount for signer[7] after 360 sec",
      +(await vesting.claimableAmount(signers[7].address))
    );

    await vesting.connect(owner).claim(signers[7].address);

    user = await vesting.userInfo(signers[7].address);
    console.log(
      "Total Claimed amount after claiming at 360s for signer[7]",
      Number(user.claimed)
    );
    console.log(
      "Claimable amount for signer[7] after claiming at 360 sec",
      +(await vesting.claimableAmount(signers[7].address))
    );
  });
});
