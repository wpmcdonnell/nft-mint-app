// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("My WPM NFT", "WPM-NFT") public {
    }

    function pressMintButton(address _to, uint256 _tokenId) public {
    _safeMint(_to, _tokenId);
}
}

/* contract SimpleStorage {
  string ipfsHash;

  function set(string memory _ipfsHash) public {
    ipfsHash = _ipfsHash;
  }

  function get() public view returns (string memory) {
    return ipfsHash;
  }
} */
