// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// contract KYC {
//     struct User {
//         string name;
//         string mobileNo;
//         string aadharCard;
//         string panCard;
//         bool isRegistered;
//     }

//     struct Organization {
//         string name;
//         string registrationNumber;
//         string organizationAddress;
//         bool isRegistered;
//     }

//     mapping(address => User) public users;
//     mapping(address => Organization) public organizations;

//     event NewUserRequested(address indexed user, string name, string mobileNo, string aadharCard, string panCard);
//     event NewOrganizationRequested(address indexed organization, string name, string registrationNumber, string organizationAddress);
//     event UserVerified(address indexed user, bool status);
//     event OrganizationVerified(address indexed organization, bool status);

//     function requestNewUser(string memory _name, string memory _mobileNo, string memory _aadharCard, string memory _panCard) public {
//         users[msg.sender] = User({
//             name: _name,
//             mobileNo: _mobileNo,
//             aadharCard: _aadharCard,
//             panCard: _panCard,
//             isRegistered: false
//         });

//         emit NewUserRequested(msg.sender, _name, _mobileNo, _aadharCard, _panCard);
//     }

//     function requestNewOrganization(string memory _name, string memory _registrationNumber, string memory _organizationAddress) public {
//         organizations[msg.sender] = Organization({
//             name: _name,
//             registrationNumber: _registrationNumber,
//             organizationAddress: _organizationAddress,
//             isRegistered: false
//         });

//         emit NewOrganizationRequested(msg.sender, _name, _registrationNumber, _organizationAddress);
//     }

//     function validateUser(address _user) public {
//         require(users[_user].isRegistered == false, "User is already registered");

//         // Perform validation logic here
//         // For demonstration, let's assume validation is successful
//         users[_user].isRegistered = true;

//         emit UserVerified(_user, true);
//     }

//     function validateOrganization(address _organization) public {
//         require(organizations[_organization].isRegistered == false, "Organization is already registered");

//         // Perform validation logic here
//         // For demonstration, let's assume validation is successful
//         organizations[_organization].isRegistered = true;

//         emit OrganizationVerified(_organization, true);
//     }
// }

// pragma solidity ^0.8.0;

// pragma solidity ^0.5.0;

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
