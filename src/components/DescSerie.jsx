import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import '../css/descSerie.css';
import React, { useState, useEffect } from "react";

function DescSerie () {
    const { id } = useParams();

     const [idData, setIdData] = useState([]);
     const [episodeData, setEpisode] = useState([]);
     const [noteData, setNote] = useState(0);
     const [poster , setPoster]  = useState("")


     const getSerie = () => {
        axios.get(`https://api.betaseries.com/shows/display?id=${id}&key=0dee025671cf`)
        .then(response => {

            console.log(response.data.show);
            setIdData(response.data.show);
            setPoster(response.data.show.images.poster);
            setNote(response.data.show.notes.mean);

            console.log(response.data.show.notes.mean);
        })
        .catch(error => console.error('Erreur lors de la récupération des données de l\'événement :', error));
     };

     const getEpisodes = () => {
        axios.get(`https://api.betaseries.com/shows/episodes?id=${id}&key=0dee025671cf`)
        .then(response => {

            console.log(response.data.episodes);
            setEpisode(response.data.episodes);
            // setPoster(response.data.show.images.poster);
            // setNote(response.data.show.notes.mean);

            // console.log(response.data.show.notes.mean);
        })
        .catch(error => console.error('Erreur lors de la récupération des données de l\'événement :', error));
     };

    useEffect(() => {
        getSerie();
        getEpisodes();
    }, []);


    return (
        <div className="wrapper">

            <Header />
            <main className='mainDesc'>

                <div className='boxImgDesc'>
                    <img className='imgDescSerie' key={poster.id} src={poster} alt="image de la serie" />

                    
                     <div className='boxDesc' key={idData.id}>
                        {/* <h2>{idData.title}</h2><br />
                        <h2>Description : </h2> */}
                        <p>{idData.description}</p>  
                        <p>Notes : {noteData} / 5</p>
                        <p>Episodes : {idData.episodes}</p>
                    </div>
                </div>
                
                <div className='blokEpisode'>
                <h3>{idData.episodes} Episodes</h3>
                    <div className='blokEpisode2'>
                    {episodeData.map((episodes) => (
                        <div className='boxEpisode'>
                            <h3>{episodes.episode}</h3>
                            <img className='imgEpisode' key={poster.id} src={poster} alt="image de la serie" />
                            <h3>{episodes.title}</h3>
                        </div>
                    ))}
                    </div>
                </div>

            </main>

        </div>
    )
}

export default DescSerie;





// {item.images.poster ? (
//     <h3>{item.title}</h3>
// ) : (
//     <h3>Pas de titre</h3>
// )}
