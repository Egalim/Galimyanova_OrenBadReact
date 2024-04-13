
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './Contact.css'
import Form from '../components/form/Form'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Contact() {
  const location = useLocation();
    localStorage.setItem('lastVisitedPage', location.pathname);

  const [array, setArray] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/pharms')
            .then(response => response.json())
            .then(json => setArray(json))
    }, [])


  return (
    <div>
      <Header />
      <div className='container'>
        <div className="content">
          <div className="contact">

            <h1 class="lettering_bold">Аптеки</h1>
            <div class="pharmacy_list">
            {
            array.map((e) => (
                <p key={e.id}>{e.name}</p>
              ))
              }

            </div>

            <h1 class="lettering_bold">Аптеки 24</h1>
            <div class="pharmacy_list">
              <p>Аптека Туркестанская 45</p>

            </div>



            <div className="contact_txt">
              <h1 className="lettering_semi_bold">Центральный офис</h1>
              <h3 className="lettering_semi_bold">460044 г. Оренбург ул. Березка, 24 </h3>
              <div className="row_counter"><h3 className="lettering_semi_bold">E-mail:</h3> <span>office@oas56.ru </span></div>
              <div className="row_counter"><h3 className="lettering_semi_bold">Режим работы:</h3> <span>пн - чт: 09-18, пт: 09-17:00</span> </div>
            </div>

            <h1 className="lettering_semi_bold">Если есть вопросы, напишите нам</h1>

            <Form />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}