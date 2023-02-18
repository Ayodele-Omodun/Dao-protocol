/** @format */

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import {
  VOTING_DELAY,
  VOTING_PERIOD,
  QOURUM_PERCENTAGE,
} from "../helper-hardhat-config";

const deployGovernorContract: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const timeLock = await get("TimeLock");
  const myToken = await get("myToken");
  log("deploying Governor...........");

  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    log: true,
    args: [
      myToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QOURUM_PERCENTAGE,
    ],
    waitConfirmations: 1,
  });
};

export default deployGovernorContract;
