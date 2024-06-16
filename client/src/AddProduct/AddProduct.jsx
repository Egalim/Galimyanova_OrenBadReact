import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header/Header'
import url from '../config'

const AddProduct = () => {
    const [title, settitle] = useState('')
    const [price, setprice] = useState('')
    const [descript, setdescript] = useState('')
    const [categoryid, setcategoryid] = useState('')
    const [makerid, setmakerid] = useState('')
    const [image, setImage] = useState(undefined)

    const role = useSelector((state) => state.auth.roleid)
    const id = useSelector((state) => state.auth.id)
    const path = useLocation()

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append('title', title);
            formData.append('price', price);
            formData.append('descript', descript);
            formData.append('image', image); // Заменили 'files' на 'image'
            formData.append('categoryid', categoryid);
            formData.append('makerid', makerid);

            const response = await fetch(`${url}/newproduct`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log("Данные успешно отправлены на сервер");
                settitle('')
                setprice('')
                setdescript('')
                setcategoryid('')
                setmakerid('')
                setImage(undefined)
            } else {
                console.log("Ошибка при отправке данных на сервер");
            }
        } catch (error) {
            console.log("Ошибка при отправке данных ", error);
        }
    }

    return (
        <>
            <Header />
            <div className='container'>
                <div className="content">

                    <form className='form-at' onSubmit={handleSubmit}>
                        <div className="form-content">

                            <div className="validate-input-at " data-validate="Обязательное поле">
                                <input className="input-at" placeholder='title' type="text" id="text" name="text" value={title} onChange={e => settitle(e.target.value)} required />
                            </div>
                            <div className="validate-input-at " data-validate="Обязательное поле"> 
                                <input className="input-at" placeholder="description" type="text" id="description" name="description" value={descript} onChange={e => setdescript(e.target.value)} required />
                            </div>
                            <div className="validate-input-at " data-validate="Обязательное поле">
                                <input className="input-at" placeholder="price" type="money" id="number" name="money" value={price} onChange={e => setprice(e.target.value)} required />
                            </div>
                            <div className="validate-input-at " data-validate="Обязательное поле">
                                <input className="input-at" placeholder="categoryid" type="text" id="categoryid" name="categoryid" value={categoryid} onChange={e => setcategoryid(e.target.value)} required />
                            </div>
                            <div className="validate-input-at " data-validate="Обязательное поле"> 
                                <input className="input-at" placeholder="makerid" type="text" id="makerid" name="makerid" value={makerid} onChange={e => setmakerid(e.target.value)} required />
                            </div>

                            <div className='txt_white'>
                                <input className="input-at" placeholder="Выбрать файл" type="file" id="photo" name="photo" accept="image/*" multiple onChange={handleFileChange} />

                            </div>
                        </div>
                        <button className='form-at-btn lettering_semi_bold' type="submit">Отправить</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default AddProduct