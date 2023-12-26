import React, { useEffect, useState } from 'react'
import './Cards.css'
import Card from './Card/Card'
import img from '../assets/spirulina.png'
import { useNavigate } from 'react-router-dom';

export default function Cards() {
    //const [Cards, setCards] = useState([])
    const navigate = useNavigate();
    const [array, setArray] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/api/product')
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
                                    navigate(`/${e.productId}`)
                                }} key={e.productId}><Card key={e.idProduct} nameProduct={e.nameProduct} img={'../src/img/' + e.img} maker={e.maker} price={e.price} instruction={e.instruction} quantity={e.quantity}/>
                            </div>
                        )
                    }) 
                }
            </div>
        </div>
    )
}

