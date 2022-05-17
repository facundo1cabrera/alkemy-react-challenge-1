import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';
import Header from './components/Header';
import Footer from './components/Footer';

import './css/bootstrap.min.css';
import './css/app.css'

function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
      const favsInLocal = localStorage.getItem('favs');
      if (favsInLocal !== null) {
          const favsArray = JSON.parse(favsInLocal);
          setFavorites(favsArray);
      }
  }, [])

  const addOrRemoveFromFavs = (e) => {
    
    const favMovies = localStorage.getItem('favs');

    let tempMoviesInFavs;

    if (favMovies === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }
    
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;


    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    }

    let movieIsInArray = tempMoviesInFavs.find(movie => movie.id === movieData.id);

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      setFavorites(tempMoviesInFavs);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
    } else {
      let moviesLeft = tempMoviesInFavs.filter(movie => {
        return movie.id !== movieData.id
      });
      setFavorites(moviesLeft);
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
    }
  }

  return (
    <>
      <Header favorites={favorites}/>

      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route path="/listado" element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs}/>}/>
        <Route path="/detalle" element={<Detalle />}/>
        <Route path="/resultados" element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs}/>} />
        <Route path="/favoritos" element={<Favoritos addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites}/>}/>
      </Routes>

      <Footer />
    </>
    
  );
}

export default App;
