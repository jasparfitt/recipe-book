import React, { useState, useEffect } from 'react';
import recipeService from '../services/recipeService';
import TagList from '../components/TagList';
import SearchBar from '../components/SearchBar';

const TagsPage = () => {
    const [tags, setTags] = useState([])
    const [allTags, setAllTags] = useState([])

    useEffect(() => {
        const allTags = recipeService.getLocalRecipes()
            .map(r => r.tags || []);

        const allTagsArray = [...new Set([].concat(...allTags).map(t => t.toLowerCase()))].sort().map(t => ({tag: t}));

        setTags(allTagsArray);
        setAllTags(allTagsArray);
    }, [])

    return (
        <div className="row">
            <div className="col-lg-8">
                <h1>Tags</h1>
                <SearchBar setList={setTags} fullList={allTags} searchKey="tag"/>
                <div className="mt-3">
                    <TagList tags={tags} />
                </div>
            </div>
        </div>
    );
}

export default TagsPage;
