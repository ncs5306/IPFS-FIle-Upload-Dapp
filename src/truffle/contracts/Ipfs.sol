pragma solidity 0.8.13;

contract Ipfs{
//contract should store file attributes
//should be able to return attributes
//should use a file counter to track each file uploaded

    struct file{
        string fileName;
        string fileType;
        string fileURL;
    }

    mapping(uint => file) public fileMap;

    uint private fileCount = 1;


    function storeFile( 
        string memory _fileName, 
        string memory _fileType,  
        string memory _fileURL
        ) public {
        fileMap[fileCount] = file(_fileName, _fileType, _fileURL);

        fileCount++;
    }

    function returnFile(uint _fileCount) public view returns(file memory){
        return fileMap[_fileCount];
    }

    function getFileCount() public view returns(uint){
        return fileCount;
    }





}