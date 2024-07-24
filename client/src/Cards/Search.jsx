import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Navigate from '../components/navigation/Navigate';
import FormSearch from '../components/FormSearch/FormSearch';
import SideNav from '../components/SideNav/SideNav';
import Card from './Card/Card';
import url from '../config';

export default function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const searchTerm = new URLSearchParams(location.search).get('term');
        if (searchTerm) {
            fetch(`${url}/search?term=${encodeURIComponent(searchTerm)}`, {
                headers: new Headers({
                  "ngrok-skip-browser-warning": "69420",
                }),
              })
                .then(response => response.json())
                .then(json => {
                    setSearchResults(json);
                })
                .catch(error => {
                    console.error('Ошибка при получении результатов поиска:', error);
                });
        }
    }, [location.search]);

    return (
        <>
            <Header />
            <div className="container">
                <div className="content catalog">
                    <SideNav />
                    <div className="catalogCards">
                        <div className="search_row center">
                            <Navigate />
                            <FormSearch />
                        </div>
                        <div className="mar-35"></div>
                        <div className="search-results">
                            {searchResults.length === 0 ?(
                                <h3 style={{textAlign: 'center'}}>По вашему запросу ничего не найдено</h3>
                            ):(
                        <div className="container_cards">
                            {searchResults.map(e => (
                                <div key={e.id} onClick={() => navigate(`../product/${e.id}`)}>
                                    <Card
                                        nameProduct={e.title}
                                        img={e.image}
                                        price={e.price}
                                        instruction={e.descript}
                                        maker={e.name}
                            
                                    />
                                </div>
                            ))}
                        </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}