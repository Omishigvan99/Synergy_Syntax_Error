const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const solc = require("solc");
const { Web3 } = require("web3");
const { addUser } = require("./controllers/user.controller");
const app = express();
app.use(
    cors({
        origin: "http://localhost:8000",
        credentials: true,
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let ACCOUNT_ADDRESS = undefined;

//initializing web3
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// Compile the contract
const contractPath = path.resolve(__dirname, "contracts", "MyContract2.sol");
const file = fs.readFileSync(contractPath, "utf8");

const input = {
    language: "Solidity",
    sources: {
        "MyContract2.sol": {
            content: file,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contract = output.contracts["MyContract2.sol"]["KYCValidationPanel"];
const bytecode = contract.evm.bytecode.object;
const abi = contract.abi;
app.abi = abi;
app.bytecode = bytecode;

// console.log("ABI: ", abi);
// console.log("Bytecode: ", bytecode);

// const contractInstance = new app.web3.eth.Contract(abi);
// console.log(abi);
// console.log(bytecode);
// contractInstance.handleRevert = true;

// Deploy the contract
// async function deploy() {
//     const accounts = await web3.eth.getAccounts();
//     ACCOUNT_ADDRESS = accounts[0];
//     console.log("Deployer account: ", ACCOUNT_ADDRESS);
//     const tx = await contractInstance.deploy({ data: bytecode });
//     const gas = await tx.estimateGas();
//     const deployedContract = await tx.send({
//         from: ACCOUNT_ADDRESS,
//         gas: gas,
//     });
//     console.log("Contract deployed at: ", deployedContract.options.address);
//     return { deployedAddress: deployedContract.options.address, gas };
// }

// async function setUser() {
//     try {
//         const { deployedAddress, gas } = await deploy();
//         const contract = new web3.eth.Contract(abi, deployedAddress);
//         const accounts = await web3.eth.getAccounts();
//         const user = accounts[0];
//         console.log("User account: ", user);
//         const tx = await contract.methods
//             .addUser(user, "omkar", 7219320908, 456178945621, "AD54D5FG")
//             .send({ from: user, gas: gas });

//         console.log("User added: ", tx);

//         console.log("Deployed address: ", deployedAddress);

//         const retTx= await contract.methods.getUser(user).call({from: user});
//         console.log("User details: ", retTx);

//     } catch (err) {
//         console.log(err);
//     }
// }

// setUser();

app.post("/new-user", async (req, res) => {
    console.log("User details: ", req.body);
    await addUser(web3,abi,bytecode,req.body);
    res.json({ status: "success" });
});

// Listen on port 8888
app.listen(process.env.PORT, () => {
    console.log("Server started on port no. 8888");
});
