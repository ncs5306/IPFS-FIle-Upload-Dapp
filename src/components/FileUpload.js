import React,{useState} from 'react';
import { create } from 'ipfs-http-client';


const client = create('https://ipfs.infura.io:5001/api/v0')

const FileUpload = (props) =>{
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

    //should handel upload to ipfs and pass info back to app so contract can store file
    const onUploadClick = async() =>{
        if(selectedFile){
            const ipfsInfo = await client.add(selectedFile)
            props.onUploadClick({selectedFile, ipfsInfo})
        } else {alert('no file selected')};
    }

    return(
        <div>
            <input type='file' name='file' onChange={onFileChange}/>
            
            <button 
                className={`ui ${props.loading ? 'loading' : ''} button`}
                onClick={onUploadClick}>Upload</button>
            
        </div>
    )
    
}

export default FileUpload