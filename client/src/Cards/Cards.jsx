import React, { useEffect, useState } from 'react'
import './Cards.css'
import Card from './Card/Card'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Cards(props) {
    //const [Cards, setCards] = useState([])
    const location = useLocation();
    localStorage.setItem('lastVisitedPage', location.pathname);
    const navigate = useNavigate();

    return (
        <div>
            <div className="container_cards">
                {
                    props.array.map((e) => {
                        
                        return (
                            <div  onClick={
                                () => {
                                    navigate(`product/${e.id}`)
                                }} key={e.id}><Card key={e.id} nameProduct={e.title} img={e.image} price={e.price} instruction={e.descript} maker={e.name}/>
                            </div>
                        )
                    }) 
                }
            </div>
        </div>
    )
}

