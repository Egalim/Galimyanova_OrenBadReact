import React, { useState } from 'react'
import './Dropdown.css'

export default function Dropdown() {

  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const handleSelectPharmacy = (pharmacyId) => {
    const selected = pharmacyArr.find((pharmacy) => pharmacy.id === pharmacyId);
    setSelectedPharmacy(selected);
  };

  const pharmacyArr = [{
    id: 1,
    name: 'Аптека Джангильдина 1/1',
    hours24: '0'
  },
  {
    id: 2,
    name: "Аптека 24 Туркестанская 45",
    hours24: '0'
  },
  {
    id: 3,
    name: 'Аптека Карагандинская 102',
    hours24: '0'
  },
  {
    id: 4,
    name: 'Аптека Гагарина 23 литер Е',
    hours24: '0'
  },
  {
    id: 5,
    name: 'Аптека Комсомольская 66',
    hours24: '0'
  },
  {
    id: 6,
    name: 'Аптека Родимцева 20',
    hours24: '0'
  },
  {
    id: 7,
    name: 'Аптека Невельская 24',
    hours24: '0'
  },
  {
    id: 8,
    name: 'Аптечный пункт Гагарина 19А',
    hours24: '0'
  },
  {
    id: 9,
    name: 'Аптечный пункт Гагарина 11',
    hours24: '0'
  },
  {
    id: 10,
    name: 'Аптечный пункт 1 Мая 61',
    hours24: '0'
  },
  {
    id: 11,
    name: 'Аптечный пункт М. Жукова 42',
    hours24: '0'
  },
  {
    id: 12,
    name: 'Аптечный пункт Заводская 20',
    hours24: '0'
  },
  {
    id: 13,
    name: 'Аптечный пункт Ноябрьская 43/2',
    hours24: '0'
  },
  {
    id: 14,
    name: 'Аптечный пункт Победы 9',
    hours24: '0'
  },
  {
    id: 15,
    name: 'Аптечный пункт Пролетарская 265',
    hours24: '0'
  },
  {
    id: 16,
    name: 'Аптечный пункт Центральная 11',
    hours24: '0'
  },
  {
    id: 17,
    name: 'Аптечный пункт Победы 140В',
    hours24: '0'
  },
  {
    id: 18,
    name: 'Аптечный пункт Химическая 6',
    hours24: '0'
  },
  {
    id: 19,
    name: 'Аптечный пункт Салмышская 13',
    hours24: '0'
  },
  {
    id: 20,
    name: 'Аптечный пункт Рыбаковская 3',
    hours24: '0'
  },
  {
    id: 21,
    name: 'Аптечный пункт Краснохолм Дзержинского 43',
    hours24: '0'
  },
  {
    id: 22,
    name: 'Аптека 24 Оренбург Туркестанская 45',
    hours24: '1'
  }
  ]

  return (
    <>
      <div className="dropdown">
        <p className='lettering_semi_bold txt_row'>Выберете адрес аптечного пункта
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
            <path d="M9.65813 0.832924C9.59523 0.754817 9.52041 0.692822 9.43796 0.650515C9.35552 0.608207 9.26709 0.586426 9.17778 0.586426C9.08846 0.586426 9.00004 0.608207 8.91759 0.650515C8.83515 0.692822 8.76032 0.754817 8.69743 0.832924L5.59882 4.64958C5.53593 4.72769 5.4611 4.78968 5.37866 4.83199C5.29621 4.8743 5.20779 4.89608 5.11847 4.89608C5.02916 4.89608 4.94073 4.8743 4.85829 4.83199C4.77584 4.78968 4.70102 4.72769 4.63812 4.64958L1.53952 0.832924C1.47662 0.754817 1.4018 0.692822 1.31935 0.650515C1.23691 0.608207 1.14848 0.586426 1.05917 0.586426C0.969854 0.586426 0.881425 0.608207 0.798981 0.650515C0.716537 0.692822 0.64171 0.754817 0.578816 0.832924C0.452808 0.989059 0.38208 1.20027 0.38208 1.42042C0.38208 1.64058 0.452808 1.85179 0.578816 2.00792L3.68418 5.83291C4.06475 6.30108 4.58061 6.56405 5.11847 6.56405C5.65633 6.56405 6.1722 6.30108 6.55276 5.83291L9.65813 2.00792C9.78414 1.85179 9.85487 1.64058 9.85487 1.42042C9.85487 1.20027 9.78414 0.989059 9.65813 0.832924Z" fill="#40394A" />
          </svg>
        </p>
        <div className="dropdown-content">
          {
            pharmacyArr.map((pharmacy) => {
              return (
                <div>
                  <a key={pharmacy.id} onClick={() => handleSelectPharmacy(pharmacy.id)}>
                    {pharmacy.name}
                  </a>

                </div>
              )
            })
          }
        </div>
      </div>
      {selectedPharmacy && (
        <div className='selected'>
          <h3 className='lettering_semi_bold'>Вы выбрали аптеку:</h3>
          <p>{selectedPharmacy.name}</p>
        </div>
      )}
    </>
  )
}