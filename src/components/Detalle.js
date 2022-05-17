import  { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';

function Detalle () {

    let token = sessionStorage.getItem('token');

    const [movie, setMovie] = useState(null);

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=fa2cc6ca83e5dbad314df30e794570df&language=en-US`;
        axios.get(endPoint)
            .then(response => {
                const movieData = response.data;
                setMovie(movieData);
            })
            .catch(error => {
                console.log(error);
            })
    }, [movieID])

    return (
        <>
            { !token && <Navigate to="/" />}

            { movie &&
                <>
                    <h2>Titulo: { movie.title }</h2>
                    <div className="row">
                        <div className="col-4">
                            <img src={`https://image.tmdb.org/t/p/w500/${ movie.poster_path }`} className="card-img-top" alt="movie poster"/>
                        </div>
                        <div className="col-8">
                            <h5>Fecha de estreno: { movie.release_date }</h5>
                            <h5>Pais de producción: { movie.production_countries[0].name}</h5>
                            <h5>Puntuación { movie.vote_average }/10</h5>
                            <h5>Reseña:</h5>
                            <p>{ movie.overview }</p>
                            <h5>Géneros: </h5>
                            <ul>
                                { movie.genres.map( genre => (
                                    <li>{ genre.name }</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            }
        </>

    );
};

export default Detalle;