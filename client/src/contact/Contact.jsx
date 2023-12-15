
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './Contact.css'
import Form from '../components/form/Form'

export default function Contact() {

  const pharmacyArr = [{
    name: 'Аптека Джангильдина 1/1',
    hours24: '0'
  },
  {
    name: "Аптека 24 Туркестанская 45",
    hours24: '0'
  },
  {
    name: 'Аптека Карагандинская 102',
    hours24: '0'
  },
  {
    name: 'Аптека Гагарина 23 литер Е',
    hours24: '0'
  },
  {
    name: 'Аптека Комсомольская 66',
    hours24: '0'
  },
  {
    name: 'Аптека Родимцева 20',
    hours24: '0'
  },
  {
    name: 'Аптека Невельская 24',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Гагарина 19А',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Гагарина 11',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт 1 Мая 61',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт М. Жукова 42',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Заводская 20',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Ноябрьская 43/2',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Победы 9',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Пролетарская 265',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Центральная 11',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Победы 140В',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Химическая 6',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Салмышская 13',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Рыбаковская 3',
    hours24: '0'
  },
  {
    name: 'Аптечный пункт Краснохолм Дзержинского 43',
    hours24: '0'
  }]

  const pharmacy24Arr = [{
    name: 'Аптека 24 Оренбург Туркестанская 45',
    hours24: '1'
  }
  ]

  return (
    <div>
      <Header />
      <div className='container'>
        <div className="content">
          <div className="contact">

            <h1 class="lettering_bold">Аптеки</h1>
            <div class="pharmacy_list">
              {
                pharmacyArr.map((e, index) => {
                  return (
                    <p>{e.name}</p>
                  )
                })
              }

            </div>

            <h1 class="lettering_bold">Аптеки 24</h1>
            <div class="pharmacy_list">
              {
                pharmacy24Arr.map((e, index) => {
                  return (
                    <p>{e.name}</p>
                  )
                })
              }

            </div>



            <div className="contact_txt">
              <h1 className="lettering_semi_bold">Центральный офис</h1>
              <h3 className="lettering_semi_bold">460044 г. Оренбург ул. Березка, 24 </h3>
              <div className="string"><h3 className="lettering_semi_bold">E-mail:</h3> <span>office@oas56.ru </span></div>
              <div className="string"><h3 className="lettering_semi_bold">Режим работы:</h3> <span>пн - чт: 09-18, пт: 09-17:00</span> </div>
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