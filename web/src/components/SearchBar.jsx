import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({setList, fullList, searchKey}) => {
    const onSearchChange = (event) => {
        const searchResults = fullList.filter(item => {
            console.log(item, searchKey);
            return item[searchKey].toLowerCase().search(event.target.value.toLowerCase()) !== -1
        });
        
        setList(searchResults);
    };

    return (
        <div className="input-group mt-3">
            <span className="input-group-text">
                <SearchIcon />
            </span>
            <input className="form-control" placeholder='Search' onChange={onSearchChange}/>
        </div>
    );
};

export default SearchBar;