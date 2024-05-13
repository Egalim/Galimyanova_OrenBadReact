import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ChangeAccount = () => {
  const id = useSelector((state) => state.auth.id)
  const [Name, setName] = useState('')
  const [Tel, setTel] = useState('')
  const [Update, setUpdate] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8080/profile/${id}`)
      .then(response => response.json())
      .then(data => {
        setName(data[0]?.name)
        setTel(data[0]?.tel)
      })
      .catch(error => {
        console.error('Ошибка при получении данных о профиле:', error);
      });
  }, [id]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setUpdate(null)
  };

  const handleTelChange = (e) => {
    setTel(e.target.value);
    setUpdate(null)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/changeAccount/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: Name,
          tel: Tel
        }),
      });
      if (response.ok) {
        setUpdate(true)
        console.log('Профиль успешно обновлен');
      } else {
        setUpdate(false)
        console.error('Ошибка при обновлении профиля');
      }
    } catch (error) {
      setUpdate(false)
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='container'>
        <div className='content content_order'>
          <div className='row_header'>
            <Link className='linkHome txt_grey' to={`/account`}>
              Вернуться назад /{' '}
            </Link>
            <div className='txt_row head_order'>
              <h2 className='lettering_semi_bold'>Изменить данные профиля</h2>
            </div>
          </div>

          <div className="content">

            <form className='form-at' onSubmit={handleSubmit}>
              <h2 className='txt_white lettering_semi_bold' style={{textAlign: 'center', marginBottom: '30px'}}>
                {Update && <p>Профиль успешно обновлен</p>}
                {Update === false && <p>Ошибка при обновлении профиля</p>}
              </h2>
              <div className="form-content">
                <label><p className='txt_white' style={{ marginBottom: '5px' }}>Изменить номер телефона</p></label>
                <div className="validate-input-at" data-validate="Обязательное поле">
                  <input className="input-at"
                    type="tel"
                    id="tel"
                    name="tel"
                    value={Tel}
                    onChange={handleTelChange}
                    required
                  />
                  <span className="focus-input-at"></span>
                </div>
              </div>
              <div className="form-content">
                <label><p className='txt_white' style={{ marginBottom: '5px' }}>Изменить Фамилию Имя</p></label>
                <div className="validate-input-at" data-validate="Обязательное поле">
                  <input className="input-at"
                    type="text"
                    id="name"
                    name="name"
                    value={Name}
                    onChange={handleNameChange}
                    required
                  />
                  <span className="focus-input-at"></span>
                </div>
              </div>
              <button className='my_button lettering_semi_bold' type="submit">Сохранить изменения</button>
            </form>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ChangeAccount;