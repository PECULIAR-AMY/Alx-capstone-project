import React from 'react';
import SearchInput from './SearchInput';
import { House } from 'lucide-react';
import Cart from './Cart';

const SearchBar = ({ isLoading, query, setQuery, handleSubmit }) => (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-white border-b border-gray-300">
        <h1 className="flex-grow text-lg font-extrabold sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl whitespace-nowrap">
            Recipe Finder
        </h1>
        <ul className="flex items-center justify-end space-x-1 sm:space-x-2 md:space-x-4 w-full">
            <li>
                <a href="/" className="p-2 hover:text-gray-800">
                    <House size={30} className="" />
                </a>
            </li>
            <li className="flex-grow px-2 lg:max-w-xs">
                <SearchInput isLoading={isLoading} query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
            </li>
            <li>
                <Cart />
            </li>
        </ul>

    </nav>
);

export default SearchBar;
