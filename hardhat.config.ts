/** @format */

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-network-helpers";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "chai";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.0" }, { version: "0.8.9" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 33137,
    },
    localhost: {
      chainId: 33137,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

export default config;
