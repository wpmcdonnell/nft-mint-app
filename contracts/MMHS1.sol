// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MMHS1 is ERC721URIStorage,Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  uint256 private _cap;

    constructor() ERC721("McDonnell Mint House, Series #1 mumbai", "MMH-S1") public {
      _cap = 100;
}

    function mint (string memory tokenURI) public onlyOwner returns(uint256) {
      require(_cap >= _tokenIds.current(), "Minting cap reached");
      _tokenIds.increment();
      uint256 currentTokenId = _tokenIds.current();
      _safeMint(msg.sender, currentTokenId);
      _setTokenURI(currentTokenId, tokenURI);
      return currentTokenId;
    }
    }
