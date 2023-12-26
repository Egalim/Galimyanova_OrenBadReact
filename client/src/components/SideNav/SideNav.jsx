import React, { useEffect, useState } from 'react'
import './SideNav.css'

export default function SideNav() {
    const [array, setArray] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/api/category')
            .then(response => response.json())
            .then(json => setArray(json))
    }, [])
   
  return (
    <div className='sideNav'>
        {
            array.map((e) => {
                return (
                    <div class="sidenav_item" key={e.idCategory}>
                            <a href= '#'> 
                            <p>{e.nameCategory}</p>
                             </a>
                            <hr />
                        </div>
                )
            })
        }

    </div>
  )
}

