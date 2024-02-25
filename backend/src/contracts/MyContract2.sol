// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KYCValidationPanel {
    
    struct User {
        string name;
        uint256 mobileNo;
        uint256 aadharCard;
        string panCard;
        bool isVerified;
    }
    
    struct Organization {
        string name;
        uint256 registrationNumber;
        address organizationAddress;
        bool isVerified;
    }
    
    mapping(address => User) public users;
    mapping(address => Organization) public organizations;
    
    address public admin;
    
    // constructor() {
    //     admin = msg.sender;
    // }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    modifier onlyNewUser(address _userAddress) {
        require(!users[_userAddress].isVerified, "User already exists and verified");
        _;
    }
    
    modifier onlyNewOrganization(address _organizationAddress) {
        require(!organizations[_organizationAddress].isVerified, "Organization already exists and verified");
        _;
    }
    
    function addUser(address _userAddress, string memory _name, uint256 _mobileNo, uint256 _aadharCard, string memory _panCard) public onlyNewUser(_userAddress) {
        users[_userAddress] = User(_name, _mobileNo, _aadharCard, _panCard, true);
    }

    function getUser(address _userAddress) public view returns(string memory, uint256, uint256, string memory, bool) {
        return (users[_userAddress].name, users[_userAddress].mobileNo, users[_userAddress].aadharCard, users[_userAddress].panCard, users[_userAddress].isVerified);
    }
    
    function addOrganization(address _organizationAddress, string memory _name, uint256 _registrationNumber, address _orgAddress) public onlyNewOrganization(_organizationAddress) {
        organizations[_organizationAddress] = Organization(_name, _registrationNumber, _orgAddress, true);
    }
    
    function validateUser(address _userAddress) public view returns(bool) {
        return users[_userAddress].isVerified;
    }
    
    function validateOrganization(address _organizationAddress) public view returns(bool) {
        return organizations[_organizationAddress].isVerified;
    }
}
