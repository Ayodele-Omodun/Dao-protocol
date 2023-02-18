/** @format */
import {
  proposalFile,
  developmentChains,
  VOTING_PERIOD,
} from "../helper-hardhat-config";
import { network, ethers } from "hardhat";
import * as fs from "fs";
import { moveBlocks } from "../utils/move-blocks";

const index = 0;

export async function main(proposalIndex: number) {
  const proposals = JSON.parse(fs.readFileSync(proposalFile, "utf8"));
  const proposalId = proposals[network.config.chainId!][proposalIndex];
  const governor = await ethers.getContract("GovernorContract");
  // 0 = against, 1 = for, 2 = abstain
  const voteWay = 0;
  const reason = "I like for a change in power";
  const voteTxResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    reason
  );
  await voteTxResponse.wait(1);
  if (developmentChains.includes(network.name)) {
    moveBlocks(VOTING_PERIOD + 1);
    console.log("voted!!!");
    console.log(`Proposal State: n/ ${await governor.state(proposalId)}`);
  }
}

main(index)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
