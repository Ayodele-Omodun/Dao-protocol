/** @format */

import { ethers, network } from "hardhat";
import {
  NEW_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  VOTING_DELAY,
  proposalFile,
} from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";
import * as fs from "fs";

export async function propose(
  args: any[],
  functionToCall: string,
  proposalDescription: string
) {
  const governor = await ethers.getContract("GovernorContract");
  const box = await ethers.getContract("Box");
  // interface.encodeFunctionData is used in ethers to encode along with function and parameter
  const encodedFunctionToCall = box.interface.encodeFunctionData(
    functionToCall,
    args
  );
  console.log(
    `Proposing ${encodedFunctionToCall} on ${box.address} with ${args}`
  );
  console.log(`Proposal Description: n/ ${proposalDescription}`);
  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encodedFunctionToCall],
    proposalDescription
  );
  const proposalReceipt = await proposeTx.wait(1);

  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1);
  }
  const proposalId = proposalReceipt.events[0].args.proposalId;
  const proposals = JSON.parse(fs.readFileSync(proposalFile, "utf8"));
  proposals[network.config.chainId!.toString()].push(proposalId.toString());
  fs.writeFileSync(proposalId, JSON.stringify(proposals));
}

propose([NEW_VALUE], FUNC, PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
