import React, { useState } from 'react';
import './FormSearch.css';
import search from '../../assets/icons/search.svg';
import { useNavigate } from 'react-router-dom';

export default function FormSearch() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== '') {
            navigate(`/search?term=${searchTerm.trim()}`); // Переход на страницу поиска с передачей поискового запроса в параметрах запроса
        }
    };

    return (
        <div className='search_container'>
            <form onSubmit={handleSubmit} className="search">
                <input
                    type="search"
                    className="search-field"
                    placeholder="Найти товар"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn_search">
                    <img src={search} alt="search" />
                </button>
            </form>
        </div>
    );
}