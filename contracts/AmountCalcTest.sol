// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./openzeppelin/contracts/utils/math/SafeMath.sol";

contract AmountCalcTest {
    using SafeMath for uint256;

    function test(
        uint256 rate,
        uint256 amount,
        uint256 payDecimals,
        uint256 tokenDecimals
    ) public view returns (uint256) {
        return (rate*((tokenDecimals > 0) ? tokenDecimals : 1)*amount);///((payDecimals>0) ? payDecimals : 1);
    }
}