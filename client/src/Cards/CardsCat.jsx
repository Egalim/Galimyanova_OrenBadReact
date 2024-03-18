import React, { useEffect, useState } from 'react';
import '../MainApp/App.css';
import Cards from '../Cards/Cards';
import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import FormSearch from '../components/FormSearch/FormSearch';
import Footer from '../components/Footer/Footer';
import CardCat from './CardCat';
import Navigate from '../components/navigation/Navigate';
import { useParams } from 'react-router-dom';

const CardsCat = () => {
  const [categoryProduct, setCategoryProduct] = useState(''); // Состояние для хранения названия категории
  const { categoryId } = useParams();

  useEffect(() => {
    // Ваш код для получения названия категории по categoryId
    fetch(`http://localhost:8080/category/${categoryId}`)
      .then(response => response.json())
      .then(data => {
        setCategoryProduct(data); // Установка названия категории в состояние
        console.log(data)
      })
      .catch(error => {
        console.error('Ошибка при получении названия категории:', error);
      });
  }, [categoryId]);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="content catalog">
          <SideNav />
          <div className="catalogCards">
            <div className="search_row">
              <Navigate />
              <FormSearch />
            </div>
            <div className="mar-35"></div>
            <CardCat />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CardsCat;