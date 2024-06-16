import React, { useEffect, useState } from 'react'
import './App.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SideNav from '../components/SideNav/SideNav'
import FormSearch from '../components/FormSearch/FormSearch'
import Cards from '../Cards/Cards'
import url from './../config.js'

const MainApp = () => {
  const [array, setArray] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  useEffect(() => {
      fetch(`${url}/products`)
          .then(response => response.json())
          .then(json => {
              setArray(json); // Оставьте эту строку без изменений
          })
  }, []);

  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return array.slice(indexOfFirstItem, indexOfLastItem);
};

  return (
    <div>
      <Header />
      <div className="container">
        <div className="content catalog">
          <SideNav />
          <div className="catalogCards">
          <FormSearch />
          <div className="mar-35"></div>
          <Cards 
            array={getCurrentItems()}
          />
          <div className='pagitaion'>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              ← Предыдущая страница
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(array.length / itemsPerPage)}>
                Следующая страница →
            </button>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MainApp