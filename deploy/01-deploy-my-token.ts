/** @format */

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";

const deployMyToken: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("deploying..................");

  const myToken = await deploy("MyToken", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: 1,
  });
  log(`Deployed myToken to ${myToken.address}`);

  await delegate(myToken.address, deployer);
  log("Delegated");
};

async function delegate(myTokenaddress: string, delegatedAccount: string) {
  const myToken = await ethers.getContractAt("MyToken", myTokenaddress);

  const tx = await myToken.delegate(delegatedAccount);
  await tx.wait(1);
  console.log(`Checkpoints: ${await myToken.numCheckpoints(delegatedAccount)}`);
}

export default deployMyToken;
