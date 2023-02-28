import React from 'react';
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from '../signup-view/signup-view';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  


  // useEffect hook allows React to perform side effects in component e.g fetching data
  useEffect(() => {
    if (!token) {
      return;
    }
    // set loading before sending API request
    setLoading(true);
    fetch('https://myflixfinder.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}

    })
      .then((response) => response.json())
      .then((data) => {
        //UNSURE CHECK LASTER could be this below//
        //        const moviesFromApi = data.map((movie) => {//

        const moviesFromApi = data.docs.map((doc) => {
          setLoading(false);
          return {
            id: doc._id,
            title: doc.Title,
            director: doc.director_name?.[0]
          };
        });
        setMovies(moviesFromApi);
   
      })
    } ,[token])
     
  // });       ----maybe uncomment

  //unclear about this second useEffect placement.  Everything below/.  nother test/
  // useEffect(() => {
  //   if (!token) return;
 
  //   fetch("..../movies", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((response) => response.json())
  //     .then((movies) => {
  //       setMovies(movies);
 
  //     });
  // }, [token]);
//everything above to previous comment//


//unclear about this placement below.  under 'authentication measures' in 3.5//

  if (!user) {
    return (
      <>
      
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or <SignupView />
        </>
    );
  }
//through this point.  everything in between.//


//unclear below too//
<button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
//unclear above too//


   if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    // conditional rendering for loading statment
    loading ? (
      <p>Loading...</p>
    ) : !movies || !movies.length ? (
      <p>No movies found</p>
    ) : (
    <div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
    > Logout
    </button>
    
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  ));
}