import React from 'react'
import './FormSearch.css'
import search from '../../assets/icons/search.svg'

export default function FormSearch() {
    return (
        <div>
            <form action="#" method="post" class="search">
                <input type="search" name="#" class="search-field" placeholder="Найти товар" />

                    <button class="btn_search" type="submit"  >
                        <img src={search} alt="search" />
                    </button>
            </form>
        </div>
    )
}

