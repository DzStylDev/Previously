import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import '../css/home.css';
import React, { useState, useEffect } from "react";

function Favorite () {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchFavorite()
      }, []);



      function fetchFavorite() {
        const apiFavorite = 'https://api.betaseries.com/shows/favorites?id=1&key=0dee025671cf';
    
        axios.get(apiFavorite)
          .then((response) => {
            console.log(response.data.shows);
            setData(response.data.shows);
          })
          .catch((error) => {
            console.error('Une erreur s\'est produite lors de la récupération des données de l\'API:', error);
          });
      }
      {console.log(data)}



    return (
        <div className="wrapper">

            <Header />
            <main className='mainHome'>
                <div className='blok1'>
                {data.map((item) => (
                    item.images.poster && (
                        <div className="blokSerie" key={item.id}>
                                <img className='imgSerie' src={item.images.poster} alt="" />
                                <h1>{item.title}</h1>
                        </div>
                        )
                    ))}
                </div>
            </main>

        </div>
    )
}

export default Favorite;