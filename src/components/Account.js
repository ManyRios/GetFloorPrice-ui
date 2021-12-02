import React from "react";
import { Button } from "react-bootstrap";

//this component load the network and information from the user
export default function Account({
  address,
  provider,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
}) {
  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button
          key="logoutbutton"
          shape="round"
          size="large"
          onClick={logoutOfWeb3Modal}
        >
          Logout
        </Button>
      );
    } else {
      modalButtons.push(
        <Button
          key="loginbutton"
          shape="round"
          size="large"
          onClick={loadWeb3Modal}
        >
          Connect
        </Button>
      );
    }
  }

  return (
    <div>
      {<span>{address ? address + " " : ""}</span>}
      {modalButtons}
    </div>
  );
}
