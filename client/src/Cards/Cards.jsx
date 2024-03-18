import React, { useEffect, useState } from 'react'
import './Cards.css'
import Card from './Card/Card'
import { useNavigate } from 'react-router-dom';

export default function Cards() {
    //const [Cards, setCards] = useState([])
    const navigate = useNavigate();
    const [array, setArray] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/products')
            .then(response => response.json())
            .then(json => {
                console.log(json); // Проверьте структуру
                setArray(json); // Оставьте эту строку без изменений
            })
    }, []);

    return (

        <div>
            <div className="container_cards">
                {
                    array.map((e) => {
                        
                        return (
                            <div  onClick={
                                () => {
                                    navigate(`/${e.id}`)
                                }} key={e.id}><Card key={e.id} nameProduct={e.title} img={e.image} price={e.price} instruction={e.descript} maker={e.name}/>
                            </div>
                        )
                    }) 
                }
            </div>
        </div>
    )
}

