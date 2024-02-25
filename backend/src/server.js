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

app.post("/new-user", async (req, res) => {
    try {
        const data = req.body;
        await addUser(web3, abi, bytecode, data);
        res.status(200).send("User added successfully");
    } catch (e) {
        console.log(e);
        res.status(500).send("Error adding user");
    }
});

// Listen on port 8888
app.listen(process.env.PORT, () => {
    console.log("Server started on port no. 8888");
});
