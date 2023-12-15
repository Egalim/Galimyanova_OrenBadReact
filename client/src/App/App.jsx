import React from 'react'
import './App.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SideNav from '../components/SideNav/SideNav'
import FormSearch from '../components/FormSearch/FormSearch'

const App = () => {
  return (
    <div>
      < Header />
      <div className="container">
        <div className="content catalog">
          <SideNav />
          <FormSearch />

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App