// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

    constructor() ERC721("WPM NFT", "WPM-NFT") public {
}

    function pressMintButton(string memory tokenURI) public returns(uint256) {
      _tokenIds.increment();
      uint256 currentTokenId = _tokenIds.current();
      _safeMint(msg.sender, currentTokenId);
      _setTokenURI(currentTokenId, tokenURI);
      return currentTokenId;
    }
  }

/* function setTokenURI(uint256 _tokenId) public {
  require(
    _isApprovedOrOwner(msg.sender, _tokenId),
    "ERC721: caller of setTokenURI is not owner or approved"
    );
    tokenURI(_tokenId); */

/* contract SimpleStorage {
  string ipfsHash;

  function set(string memory _ipfsHash) public {
    ipfsHash = _ipfsHash;
  }

  function get() public view returns (string memory) {
    return ipfsHash;
  }
} */
