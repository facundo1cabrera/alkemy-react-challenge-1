import { Navigate } from 'react-router-dom';

function Favoritos(props) {

    let token = sessionStorage.getItem('token');

    return (
        <>
            {!token && <Navigate to="/" />}

            <h2>Sección de favoritos</h2>
            <div className="row">

            { !props.favorites.length && <div className="col-12 text-danger">Agrega tus peliculas favoritas!</div>}

                {
                    props.favorites.map((movie, idx) => {
                        return (

                            <div className='col-3' key={idx}>
                                <div className="card my-4" style={{ width: '18rem' }}>
                                    <img src={ movie.imgURL } className="card-img-top" alt="..." />
                                    <button
                                        className='favourite-btn'
                                        onClick={props.addOrRemoveFromFavs}
                                        data-movie-id={movie.id}
                                    >🖤</button>
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title.substring(0, 30)}...</h5>
                                        <p className="card-text">{movie.overview.substring(0, 100)}...</p>
                                        {/*<Link to={`/detalle?movieID=${movie.id}`} className="btn btn-primary">View detail</Link>*/}
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

export default Favoritos;