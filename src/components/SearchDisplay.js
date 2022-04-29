import React from 'react';

const SearchDisplay = ({searchResult}) =>{

    if(searchResult){

        return (
            <div className="ui segment">
                <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>{searchResult.fileName}</th>
                                <th>{searchResult.fileType}</th>
                                <th>{`https://ipfs.infura.io/ipfs/${searchResult.fileURL}`}</th>
                            </tr>
                        </thead>
                </table>
            </div>
        )
    }else{return null;}
   
}

export default SearchDisplay