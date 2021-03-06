import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';

function Listado(props) {

    let token = sessionStorage.getItem('token');

    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/movie/top_rated?api_key=fa2cc6ca83e5dbad314df30e794570df&language=en-US&page=1';
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data.results;
                setMoviesList(apiData);
            })
            .catch( error => {
                swAlert(<h2>Intenta mas tarde</h2>)
            })
    }, [moviesList])

    return (
        <>
            {!token && <Navigate to="/" />}
            <div className="row">

                {
                    moviesList.map((movie, idx) => {
                        return (

                            <div className='col-3' key={idx}>
                                <div className="card my-4" style={{ width: '18rem' }}>
                                    <img src={`https://image.tmdb.org/t/p/w500${ movie.poster_path}`} className="card-img-top" alt="..." />
                                    <button 
                                        className='favourite-btn'
                                        onClick={props.addOrRemoveFromFavs}
                                        data-movie-id={ movie.id }
                                    >🖤</button>
                                    <div className="card-body">
                                        <h5 className="card-title">{ movie.title.substring(0, 30) }...</h5>
                                        <p className="card-text">{ movie.overview.substring(0, 100) }...</p>
                                        <Link to={`/detalle?movieID=${ movie.id }`} className="btn btn-primary">View detail</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default Listado;