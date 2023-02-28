import React from 'react';
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from '../signup-view/signup-view';


export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");



  //this is bookcard example from codesandbox//
  useEffect(() => {
    fetch('https://myflixfinder.herokuapp.com/movies', {
  
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            director: doc.director_name?.[0]
          };
        });
        setMovies(moviesFromApi);
   
      })
      .catch((error) => {
        console.log(error);
      });
  });

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


//unclear about this placement below.  under 'authentication measures' in 3.5.testingagain//
  const [token, setToken] = useState(null);

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
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
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
}