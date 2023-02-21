import React from 'react';
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  //this is bookcard example from codesandbox//
  useEffect(() => {
    fetch('https://myflixfinder.herokuapp.com/movies', {
  
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
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


  
       
//   /this is bookcard example from codesandbox//
//   useEffect(() => {
//     fetch("https://openlibrary.org/search.json?q=star+wars")
//       .then((response) => response.json())
//       .then((data) => {
//         const moviesFromApi = data.docs.map((doc) => {
//           return {
//             id: doc.key,
//             title: doc.title,
//             image:
// `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
//             director: doc.director_name?.[0]
//           };
//         });
//         setMovies (moviesFromApi);
//       });
//   }, []);
       
        


// componentDidMount() {axios
// .fetch("https://openlibrary.org/search.json?q=star+wars")
// .then((response) => {
// this.setState({
// movies: response.data

  

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