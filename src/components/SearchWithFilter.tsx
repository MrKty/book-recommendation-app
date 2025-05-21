import { Input, Select } from 'antd';
import { useState, useEffect } from 'react';

const { Search } = Input;

const searchFields = [
    { label: 'Title', value: 'intitle' },
    { label: 'Author', value: 'inauthor' },
    { label: 'Publisher', value: 'inpublisher' },
    { label: 'ISBN', value: 'isbn' },
];

const genres = [
    { label: 'Fiction', value: 'fiction' },
    { label: 'Science', value: 'science' },
    { label: 'History', value: 'history' },
    { label: 'Romance', value: 'romance' },
    { label: 'Biography', value: 'biography' },
];

interface Props {
    initialQuery?: string;
    initialField?: string;
    initialGenre?: string;
    onSearch: (query: string) => void;
}

const SearchWithFilter = ({
    initialQuery = '',
    initialField = 'intitle',
    initialGenre = 'fiction',
    onSearch,
}: Props) => {
    const [searchValue, setSearchValue] = useState(initialQuery);
    const [field, setField] = useState(initialField);
    const [genre, setGenre] = useState(initialGenre);

    const handleSearch = () => {
        if (!searchValue.trim() && !genre) {
            onSearch('subject:fiction');
            return;
        }

        let queryParts: string[] = [];

        if (searchValue.trim()) {
            queryParts.push(`${field}:${searchValue.trim()}`);
        }

        if (genre) {
            queryParts.push(`subject:${genre}`);
        }

        onSearch(queryParts.join('+'));
    };

    const genreOptions = [
        {
            label: 'All Genres',
            value: '',
            disabled: searchValue.trim() === '',
        },
        ...genres,
    ];

    // Genre change triggers search immediately
    useEffect(() => {
        handleSearch();
    }, [genre]);

    return (
        <div style={{ display: 'flex', gap: 8 }}>
            <Select
                value={field}
                onChange={setField}
                style={{ width: 140 }}
                options={searchFields}
            />
            <Search
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={handleSearch}
                enterButton
                placeholder="Enter keyword"
                allowClear
                style={{ width: 260 }}
            />
            <Select
                value={genre}
                onChange={setGenre}
                style={{ width: 180 }}
                options={genreOptions}
            />
        </div>
    );
};

export default SearchWithFilter;