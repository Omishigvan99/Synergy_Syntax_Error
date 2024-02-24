async function addUser(web3, abi, bytecode, data) {
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
        .addUser(user, data.name, data.mobile, data.aadhar, data.pan)
        .send({ from: user, gas: gas });
    console.log("User added: ", newtx);

    //validate user
    const validateResult = await contract.methods
        .validateUser(deployedContract.options.address)
        .call({ from: user });
    console.log("User validated: ", validateResult);
}

module.exports = {
    addUser,
};
