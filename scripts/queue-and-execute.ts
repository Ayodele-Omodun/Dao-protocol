/** @format */

import {
  FUNC,
  NEW_VALUE,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  MIN_DELAY,
} from "../helper-hardhat-config";
import { ethers, network } from "hardhat";
import { moveTime } from "../utils/move-time";
import { moveBlocks } from "../utils/move-blocks";

export async function queueAndExecute() {
  const args = [NEW_VALUE];
  const box = await ethers.getContract("Box");
  const governor = await ethers.getContract("GovernorContract");
  const encodedFunctionCall = box.interface.encodeFunctionData(FUNC, args);
  const descriptionHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION)
  );
  console.log("queueing..........");
  const queueTx = await governor.queue(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );
  await queueTx.wait(1);
  if (developmentChains.includes(network.name)) {
    await moveTime(MIN_DELAY + 1);
    await moveBlocks(1);
  }

  console.log("Executing.............");

  const executeTx = await governor.execute(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );
  await executeTx.wait(1);

  const boxNewValue = await box.retrieve();
  console.log(`Box new value is ${boxNewValue.toString()}`);
}

queueAndExecute()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
