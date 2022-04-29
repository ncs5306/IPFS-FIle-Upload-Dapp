import React from 'react';
import { ethers } from "ethers";

const ConnectButton = (props) =>{

    const onConnectClick = async() =>{
        if(typeof window.ethereum !== 'undefined'){
            try{
                await window.ethereum.request({method: 'eth_requestAccounts'});
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                const userAddress = await provider.listAccounts()
                //calllback method that takes provider and signer as arguments
                props.onConnectClick({provider, signer, userAddress})
            //catches error and logs it 
            }catch(error){console.log(error)} 
        //alrts if metamask is not detected 
       } else {alert('Metamask not detcted in browser!')}
    }



    return (
        <div>
            <button 
                className="ui button"
                onClick={onConnectClick}>Connect</button>
        </div>
    )
}
export default ConnectButton