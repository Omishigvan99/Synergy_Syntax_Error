const { compare } = require("../utils/compare");

async function addUser(web3, abi, bytecode, data) {
    try {
        //validate data
        const obj1 = {
            name: data.name,
            mobile: data.mobile,
            aadhar: data.aadhar,
            pan: data.pan,
        };

        const response = await compare(obj1);
        console.log("Data validated: ", response);
        console.log(response);
        console.log("Data validated: ", response);
        //deploy contract
        const contractInstance = new web3.eth.Contract(abi);
        contractInstance.handleRevert = true;

        const accounts = await web3.eth.getAccounts();
        const ACCOUNT_ADDRESS = accounts[0];
        console.log("Deployer account: ", ACCOUNT_ADDRESS);
        const tx = await contractInstance.deploy({ data: bytecode });
        const gas = await tx.estimateGas();
        const deployedContract = await tx.send({
            from: ACCOUNT_ADDRESS,
            gas: gas,
        });
        console.log("Contract deployed at: ", deployedContract.options.address);

        //add user
        const contract = new web3.eth.Contract(
            abi,
            deployedContract.options.address
        );
        const user = accounts[0];
        console.log("User account: ", user);
        const newtx = await contract.methods
            .addUser(
                user,
                data.name,
                data.mobile,
                parseInt(data.aadhar.replace(" ", "")),
                data.pan
            )
            .send({ from: user, gas: gas });
        console.log("User added: ", newtx);

        //validate user
        const validateResult = await contract.methods
            .validateUser(user)
            .call({ from: user });
        console.log("User validated: ", validateResult);
    } catch (e) {
        console.log("Error: ")
        console.log(e);
    }
}

module.exports = {
    addUser,
};
