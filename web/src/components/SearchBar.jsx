import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ setSearchTerm }) => {
  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
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