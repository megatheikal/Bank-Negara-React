import Web3 from "web3";

const web3 = new Web3(window.ethereum); // pass metamask library

window.ethereum.enable(); //enable the connection
export default web3; //export the object to other components
