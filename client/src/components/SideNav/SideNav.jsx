import React, { useEffect, useState } from 'react'
import './SideNav.css'
import { useNavigate } from 'react-router-dom';

export default function SideNav() {
    const navigate = useNavigate();
    const [array, setArray] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/category')
            .then(response => response.json())
            .then(json => setArray(json))
    }, [])
   
  return (
    <div className='sideNav'>
        {
            array.map((e) => {
                return (
                    <div  class="sidenav_item" onClick={
                        () => {
                            navigate(`/category/${e.id_cat}`)
                        }} key={e.id_cat}>
                            <a> 
                            <p>{e.name_cat}</p>
                             </a>
                            <hr />
                        </div>
                )
            })
        }

    </div>
  )
}

