const HDWalletProvider = require("truffle-hdwallet-provider"); //It can be uses wherever a Web3 provider is needed, not just in Truffle. It will sign transactions for addresses derived from a 12-word mnemonic.
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");

// creating an instance from the provider and passing the metamask 12-words mnemonic, and the link from Infura that you get
// after creating an account in Infura, and create Rinkeby as the end point.
const provider = new HDWalletProvider(
    "this enroll hedgehog board sad grief film absurd across vicious frown gallery",
    "https://rinkeby.infura.io/4F74357946c40E31C3a8F9Daf010B4A1cE42Ba2c"
);


const web3 = new Web3(provider);  //create a web3 instance using the provider instantiated above.
let contractAddress;

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: "0x" + bytecode, arguments: [1000, "BCCoin", 0, "BC", 100]}) // Passing the bytecode as hexadecimal and the arguments of the constructor
        .send({gas: "1000000", from: accounts[0]});
    contractAddress = result.options.address;
    console.log("Contract deployed to", contractAddress);
};

deploy();