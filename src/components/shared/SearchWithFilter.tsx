import { Input, Select } from 'antd';
import { useState, useMemo } from 'react';

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

    const buildQueryAndSearch = (fieldParam = field, valueParam = searchValue, genreParam = genre) => {
        const trimmed = valueParam.trim();
        let queryParts: string[] = [];

        if (!trimmed && !genreParam) {
            onSearch('subject:fiction');
            return;
        }

        const lowerTrimmed = trimmed.toLowerCase();
        const isFieldPrefixed = searchFields.some((f) =>
            lowerTrimmed.startsWith(`${f.value}:`)
        );

        const alreadyIncludesGenre = lowerTrimmed.includes(`subject:${genreParam}`);

        if (trimmed) {
            if (isFieldPrefixed) {
                queryParts.push(trimmed);
            } else {
                queryParts.push(`${fieldParam}:${trimmed}`);
            }
        }

        if (genreParam && !alreadyIncludesGenre) {
            queryParts.push(`subject:${genreParam}`);
        }

        onSearch(queryParts.join('+'));
    };

    const genreOptions = useMemo(() => [
        { label: 'All Genres', value: '', disabled: searchValue.trim() === '' },
        ...genres,
    ], [searchValue]);

    // Genre change triggers search immediately, This is wrong way
    /*
    useEffect(() => {
        handleSearch();
    }, [genre]);
    */

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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                onSearch={(value: string) => buildQueryAndSearch(field, value, genre)}
                enterButton
                placeholder="Enter keyword"
                allowClear
                style={{ width: 260 }}
            />
            <Select
                value={genre}
                onChange={(newGenre) => {
                    setGenre(newGenre);
                    buildQueryAndSearch(field, searchValue, newGenre);
                }}
                style={{ width: 180 }}
                options={genreOptions}
            />
        </div>
    );
};

export default SearchWithFilter;