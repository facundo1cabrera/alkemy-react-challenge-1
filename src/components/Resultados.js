import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';

function Resultados () {

    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');


    const [moviesResults, setMoviesResults] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=fa2cc6ca83e5dbad314df30e794570df&language=en-US&query=${keyword}&page=1`

        axios.get(endPoint).then( response => {
            const moviesArray = response.data.results;
            if ( moviesArray.length === 0 ) {
                swAlert(<h5>No encontramos resultados para: { keyword }</h5>);
            }
            setMoviesResults(moviesArray);

        }).catch(error => console.log(error))
    }, [keyword])

    return (
        <>
            <h2>Buscaste: <em>{keyword}</em></h2>
            <div className='row'>
                {
                    moviesResults.map((movie, idx) => {
                        return (
                            <div className='col-3' key={idx}>
                                <div className="card my-4" style={{ width: '18rem' }}>
                                    <img src={`https://image.tmdb.org/t/p/w500${ movie.poster_path}`} className="card-img-top" alt="..." />
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
    );
};

export default Resultados;