import { useNavigate } from 'react-router-dom';
import stringService from '../services/stringService';

const TagList = ({ tags }) => {
  const navigate = useNavigate();
  const open = (term) => navigate(`/tag/${term}`);

  return tags.map((tag, index) => (
    <div key={`tag-${index}`} className='input-group mt-1'>
      <button 
        type="button" 
        className="btn btn-outline-primary flex-grow-1 text-start"
        onClick={() => open(tag)}>
        {stringService.capitalise(tag)}
      </button>
    </div>
  ));
};

export default TagList;