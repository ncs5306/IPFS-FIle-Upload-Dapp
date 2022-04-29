import React, {useState} from 'react';

const SearchBar = (props) =>{
    const [term, setTerm] = useState('');
    const [exist, setExist] = useState(true);


    const onFormSubmit = (e) =>{
        e.preventDefault()
        const result = props.fileArr.find( ({ fileName }) => fileName === term);
        if(result){
            setExist(true)
            props.onSearchSubmit(result)
        }else{
            setExist(false)
        }
    }

    return(
        <div>
            <form 
                className="ui form"
                onSubmit={onFormSubmit}
                >
                <div className="field">
                    <label>{`File Search: ${exist ? '':'NO FILE WITH THIS SEARCH TERM'}`}</label>
                    <input 
                        type="text"
                        value={term}
                        onChange={(e) => {setTerm(e.target.value)}}
                        />
                </div>
            </form>
        </div>
    
    )

} 
export default SearchBar