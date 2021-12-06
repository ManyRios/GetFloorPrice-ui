import { useState, useEffect, useCallback } from "react";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { Container, Card, Button, Col } from "react-bootstrap";
import { NavbarMenu, Account } from "./components";

const App = () => {

  //We set the states for the app
  const [network, setNetwork] = useState();
  const [provider, setWriteProvider] = useState();
  const [price, setPrice] = useState();
  const [address, setAddress] = useState();
  //Abi and address from the deployed contract witch interacts with the iexec oracle factory
  const abi = require("./contracts/GetFloorPrice.abi");
  const contractAddr = require("./contracts/GetFloorPrice.address");

  //load the web3modal to get the providers and owner address
  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    // Wrapper for transforming a web3 provider (like metamask)
    setWriteProvider(new Web3Provider(provider));
    setAddress(provider.selectedAddress);
    setNetwork(provider.networkVersion);
  }, [setWriteProvider]);
  //get the data that came from the oracle factory and it configured API 
  async function getOracle() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddr, abi, signer);

    try {
      const oracle = await contract.getOracleData()
      const data = await contract.getFloorPrice();
      const ch = ethers.utils.formatEther(data);
      setPrice(ch);
      console.log("data: ", ch, oracle);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  return (
    <div>
      <Container className="border">
        <div className="d-flex col-12">
          <div className="mx-auto"></div>
          <Account
            address={address}
            provider={provider}
            web3Modal={web3Modal}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            className=""
          />
        </div>
        <Col md={12}>
          <NavbarMenu />
          <h2 className="text-center mt-4">
            Opensea collection floor price for Doodles
          </h2>
        </Col>

        <Col md={12} className="d-flex text-Center justify-content-center">
          {network !== "133" && address ? (
            <Card>
              <h2>Please change your network to iExec test sidechain 133</h2>
            </Card>
          ) : (
            <Card
              style={{ width: "18rem" }}
              border="dark"
              className="p-3 shadow mb-3"
            >
              <Card.Img variant="top" src="/doodles.png" />
              <Card.Body>
                {!address ? (
                  "Please Connect your wallet "
                ) : (
                  <div>
                    <Card.Text>
                      Doodles is a community-driven collectibles NFT project.
                      Doodle NFTs are made up with over a hundred exciting
                      traits of faces, hair, hats, body and backgrounds. Each
                      Doodle is a unique, non-fungible token (NFT) on the
                      Ethereum blockchain.
                    </Card.Text>
                    <Card.Text>
                      The floor price for our collection is: $
                      <span style={{ color: "red" }}>{price}</span>
                    </Card.Text>

                    {price ? (
                      <Button href="https://opensea.io/collection/doodles-official">
                        Visit our market
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={getOracle}>
                        Get Floor price
                      </Button>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Container>
    </div>
  );
};

const web3Modal = new Web3Modal({
  // Modal to connect wallets
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "9464eac6cd0d4d6a888fb8ace2f9dd0b",
      },
    },
  },
});
//logout the user and reloads the page
const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

window.ethereum &&
  window.ethereum.on("chainChanged", (chainId) => {
    setTimeout(() => {
      window.location.reload();
    }, 1);
  });

export default App;
