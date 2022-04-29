import React, {useState} from 'react';
import ConnectButton from './components/ConnectButton';
import FileUpload from './components/FileUpload';
import Table from './components/Table';
import SearchBar from './components/SearchBar';
import SearchDisplay from './components/SearchDisplay';
import { ethers } from "ethers";

const contractAddress = '0xB56C9700266feE7B19f4e8F7bac779A690A3D5Dd';
const {abi} = require('./truffle/build/contracts/Ipfs.json');


const App = () =>{
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [userAddress, setUserAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const [fileArr, setFileArr] = useState([]);

    const [initialConnect, setInitialConnect] = useState(true);

    const [searchResult, setSearchResult] = useState();
   

    const onConnectClick = async({provider, signer, userAddress}) =>{
        setProvider(provider);
        setSigner(signer);
        setUserAddress(userAddress)

        //creates contract and gets the current file count
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const fileCount = await contract.getFileCount()
    
        //checks if file count is not 1 and loops through 
        if(fileCount != 1 && initialConnect == true){
            for(let i = 1; i<fileCount; i++){
                const result = await contract.returnFile(i)
                fileArr.push(result)
            }
            setInitialConnect(false);
        }else{console.log('no previous files')}
    }

    //uploads file to contract //add in else condition in the future
    const onUploadClick = async({selectedFile, ipfsInfo}) =>{
        if(provider != null && signer != null){
            try{
                setLoading(true);
                const contract = new ethers.Contract(contractAddress, abi, provider);
                const contractWithSigner = contract.connect(signer);

                //adds the selected file to the contract 
                const tx = await contractWithSigner.storeFile(selectedFile.name, selectedFile.type, ipfsInfo.path);
                await tx.wait()
                setLoading(false);

                //pass in file count arg
                const result = await contract.returnFile(fileArr.length + 1);
                setFileArr([...fileArr, result])
            } catch(error){alert(error)}
        }else{console.log('must connect first')}
    }

    const onSearchSubmit = (result) =>{
       setSearchResult(result)
    }

    return (
        <div>
            <div className="ui three item menu">
                <div className="item">
                    <ConnectButton onConnectClick={onConnectClick}/>{userAddress}
                </div>
                <div className="item">
                    <FileUpload onUploadClick={onUploadClick} loading={loading}/>
                </div>
                <div className="item">
                    <SearchBar onSearchSubmit={onSearchSubmit} fileArr={fileArr}/>
                </div>
            </div>
            <div>
                <SearchDisplay searchResult={searchResult}/>
            </div>
            <div>
                <Table fileArr={fileArr}/>
            </div>
        </div>
    )
}

export default App