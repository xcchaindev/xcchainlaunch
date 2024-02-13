// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./openzeppelin/contracts/access/Ownable.sol";
import "./openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./openzeppelin/contracts/utils/math/SafeMath.sol";
import "./openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenLocker.sol";


interface IDOFactoryInterface {
    function isIdoAddress(address _address) external view returns (bool);
}


contract TokenLockerFactory is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for ERC20;

    uint256 public lockerCount = 0;
    uint256 public fee = 0;

    bool public onlyOwnerCreate = false;

    function setOnlyOwnerCreate(bool newVal) public onlyOwner {
        onlyOwnerCreate = newVal;
    }

    struct lockerInfo {
        uint256 lockerId;
        address tokenAddress;
        address creator;
        uint256 ramaining;
        address withdrawer;
        uint256 withdrawTime;
    }

    address[] public lockerAddresses;

    event LockerCreated(uint256 lockerId, address indexed lockerAddress, address tokenAddress);

    IDOFactoryInterface public idoFactory;

    constructor(address _idoFactory){
        idoFactory = IDOFactoryInterface(_idoFactory);
    }
    function setIDOFactory(address _idoFactory) public onlyOwner {
        idoFactory = IDOFactoryInterface(_idoFactory);
    }

    function canCreateIdo() private view returns (bool) {
        if (!onlyOwnerCreate) return true;
        if (msg.sender == this.owner()) return true;
        if (idoFactory.isIdoAddress(msg.sender)) return true;
        return false;
    }
    function getLockerAddresses() public view returns (address[] memory) {
      return lockerAddresses;
    }

    function createLocker(
        ERC20 _tokenAddress,
        string memory _name,
        uint256 _lockAmount,
        address _withdrawer,
        uint256 _withdrawTime
    ) payable public returns(address){
        require(canCreateIdo() == true, 'Not allow create IDO for you');
        require(msg.value == fee, 'Fee amount is required');

        TokenLocker tokenLocker = new TokenLocker(_tokenAddress, _name, _withdrawer, _withdrawTime);
        tokenLocker.transferOwnership(msg.sender);

        _tokenAddress.safeTransferFrom(
                msg.sender,
                address(tokenLocker),
                _lockAmount
            );

        lockerAddresses.push(address(tokenLocker));

        emit LockerCreated(lockerCount, address(tokenLocker), address(_tokenAddress));
        lockerCount++;
        return address(tokenLocker);

    }

    function withdrawFee() public onlyOwner{
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }

    function setFee(uint256 amount) public onlyOwner{
        fee = amount;
    }
}