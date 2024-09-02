import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import '../css/home.css';
import React, { useState, useEffect } from "react";

function Home () {
    const [data, setData] = useState([]);


    let navigation = useNavigate();
  
      function fetchSerie() {
        const apiUrl = 'http://api.betaseries.com/shows/list?key=0dee025671cf';
    
        axios.get(apiUrl)
          .then((response) => {
            console.log(response.data.shows);
            setData(response.data.shows);
          })
          .catch((error) => {
            console.error('Une erreur s\'est produite lors de la récupération des données de l\'API:', error);
          });
      }



      function addFavorite(e,item) {
        //btn like devient rouge
        e.currentTarget.parentElement.parentElement.children[1].children[2].src = require('../asset/likered.png') ;

        const apiFavorite = `https://api.betaseries.com/shows/favorite?id=${item.id}&token=87425b1e4be2&key=0dee025671cf`;
    
        axios.post(apiFavorite)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Une erreur s\'est produite lors de la récupération des données de l\'API:', error);
          });
      }
      useEffect(() => {
        fetchSerie();
      }, []);


    return (
        <div className="wrapper">

            <Header />
            <main className='mainHome'>

                <div className='blok1'>
                  {data.map((item) => (
                    item.images.poster && (
                        <div className="blokSerie" key={item.id}>
                            <Link className='linkImg' to={`/descSerie/${item.id}`}>
                                <img className='imgSerie' src={item.images.poster} alt="" />
                            </Link>
                            <div className='boxAddSerie'>
                                <p>{item.title}</p>
                                <div className='boxBtnSerie'>
                                    <img className='btnAdd' src={require('../asset/btnAdd.png')} alt="" />
                                    <img className='btnAdd' src={require('../asset/vue1.png')} alt="" />
                                    {/* serie ajouter a favorie et btn like devient rouge */}
                                    <img className='btnAdd' src={require('../asset/like.png')}  alt="" onClick={(e) => addFavorite(e, item)} />
                                </div>
                            </div>
                            <Link className='linkDesc' to={`/descSerie/${item.id}`}>
                                <img className='descSerie' src={require('../asset/btnDesc.png')} alt="" />
                            </Link>
                        </div>
                        )
                    ))}
                </div>
            </main>

        </div>
    )
}

export default Home;