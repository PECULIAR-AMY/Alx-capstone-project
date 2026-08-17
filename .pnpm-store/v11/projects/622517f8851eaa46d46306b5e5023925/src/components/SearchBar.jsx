import React from 'react';
import { House, LogOut, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import Cart from './Cart';
import { useAuth } from './AuthContext';

const SearchBar = ({ isLoading, query, setQuery, handleSubmit }) => {
    const { user, signOut } = useAuth();
    return (
        <nav className="flex flex-wrap items-center justify-between p-4 bg-white border-b border-gray-300">
            <h1 className="flex-grow text-lg font-extrabold sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl whitespace-nowrap">Recipe Finder</h1>
            <ul className="flex items-center justify-end space-x-1 sm:space-x-2 md:space-x-4 w-full">
                <li><Link to="/" className="p-2 hover:text-gray-800" aria-label="Home"><House size={30} /></Link></li>
                <li className="flex-grow px-2 lg:max-w-xs"><SearchInput isLoading={isLoading} query={query} setQuery={setQuery} handleSubmit={handleSubmit} /></li>
                <li><Cart /></li>
                <li className="ml-1">
                    {user ? (
                        <button type="button" onClick={signOut} className="nav-auth-button" title={`Signed in as ${user.email}`}><UserRound size={18} /><span className="hidden sm:inline">{user.name.split(' ')[0]}</span><LogOut size={16} aria-label="Sign out" /></button>
                    ) : (
                        <Link to="/login" className="nav-auth-button"><UserRound size={18} /><span>Sign in</span></Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default SearchBar;

SearchBar.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};
