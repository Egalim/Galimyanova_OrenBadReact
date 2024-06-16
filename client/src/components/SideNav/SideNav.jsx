import React, { useEffect, useState } from 'react';
import './SideNav.css';
import { useNavigate, useLocation } from 'react-router-dom';
import url from '../../config';

export default function SideNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${url}/category`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Ошибка при получении данных о категориях:', error));
    }, []);

    return (
        <div className="sideNav">
            {categories.map(category => (
                <div
                    key={category.id_cat}
                    className={`sidenav_item ${location.pathname === `/category/${category.id_cat}` ? 'active' : ''}`}
                    onClick={() => navigate(`/category/${category.id_cat}`)}
                >
                    <a>
                        <p>{category.name_cat}</p>
                    </a>
                    <hr />
                </div>
            ))}
        </div>
    );
}