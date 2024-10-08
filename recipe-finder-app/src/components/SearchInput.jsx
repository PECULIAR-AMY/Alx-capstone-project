import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({ handleSubmit, query, isLoading, setQuery }) => (
    <form onSubmit={handleSubmit} className="relative border-purple-500">
        <input
            value={query}
            name="query"
            type="search"
            placeholder="Search"
            disabled={isLoading}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full p-2 rounded-full bg-gray-200"
        />
        <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full">
            <Search />
        </button>
    </form>
);

export default SearchInput;
