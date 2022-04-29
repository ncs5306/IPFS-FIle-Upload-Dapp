import React from 'react';

const Table = (props) =>{

    if(props.fileArr){
        return(
            <div className="ui segment">
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>File Path</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.fileArr.map((file, index) => (
                            <tr key={index}>
                                <td>{file.fileName}</td>
                                <td>{file.fileType}</td>
                                <td>{`https://ipfs.infura.io/ipfs/${file.fileURL}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) 
    } else {console.log('no files')}
}

export default Table