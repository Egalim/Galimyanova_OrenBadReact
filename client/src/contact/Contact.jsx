
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

              <div>
              <div style={{position:"relative", overflow:"hidden"}}><a href="https://yandex.ru/maps/48/orenburg/search/%D0%B0%D0%BF%D1%82%D0%B5%D0%BA%D0%B8%20%D0%B3%D0%B0%D1%83%D0%B7%20%D0%BE%D0%B0%D1%81/?utm_medium=mapframe&utm_source=maps"
               style={{color:"#eee", fontSize:"14px", position:"absolute", top:"0px"}}>аптеки гауз оас в Оренбурге</a><a href="https://yandex.ru/maps/48/orenburg/?utm_medium=mapframe&utm_source=maps"
               style={{color:"#eee", fontSize:"14px", position:"absolute",top:"14px"}}>Оренбург</a>
               <iframe src="https://yandex.ru/map-widget/v1/?ll=55.093349%2C51.776388&mode=search&sll=55.036630%2C51.788690&sspn=0.109177%2C0.062065&text=%D0%B0%D0%BF%D1%82%D0%BA%D0%B8%20%D0%B3%D0%B0%D1%83%D0%B7%20%D0%BE%D0%B0%D1%81&z=11" 
               width="100%" height="600" frameborder="1" allowfullscreen="true" style={{position:"relative"}}></iframe></div>
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