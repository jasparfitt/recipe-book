import TagList from '../components/TagList';
import SearchBar from '../components/SearchBar';
import useTagsPage from '../../../shared/pages/useTagsPage';

const TagsPage = () => {
  const { tagList, setSearchTerm } = useTagsPage();

  return (
    <div className="row">
      <div className="col-lg-8">
        <h1>Tags</h1>
        <SearchBar setSearchTerm={setSearchTerm} />
        <div className="mt-3">
          <TagList tags={tagList} />
        </div>
      </div>
    </div>
  );
}

export default TagsPage;
