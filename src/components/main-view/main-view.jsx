import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [
            {
              "Title": "E.T",
              "Description": "E.T. is a 1982 American science fiction film produced and directed by Steven Spielberg and written by Melissa Mathison. It tells the story of Elliott, a boy who befriends an extraterrestrial dubbed E.T., who is left behind on Earth.",
              "Genre": {
                "Name": "Drama",
                "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods. To these ends, a primary element in a drama is the occurrence of conflict—emotional, social, or otherwise—and its resolution in the course of the storyline."
              },
              "Director": {
                "Name": "Steven Spielberg",
                "Bio": "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood\'s best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.",
                "Birth": 1946
              },
              "ImageURL": "https://upload.wikimedia.org/wikipedia/en/6/66/E_t_the_extra_terrestrial_ver3.jpg",
              "Featured": false
            },
          
              {
                "Title":"Animal World",
                "Description":"A man finds himself deep in debt and is coerced to board a ship that hosts a risky gambling party.",
                "Genre": {
                  "Name":"Action",
                  "Description":"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero."
                },
                "Director": {
                  "Name":"Yan Han",
                  "Bio":"We don't have a biography for Yan Han.",
                  "Birth":1983
                },
                "ImageURL":"https://upload.wikimedia.org/wikipedia/en/0/06/Animal_World_Movie_2018.jpg",
                "Featured":false
              },
              {
                "Title":"Joker",
                "Description":"A mentally troubled stand-up comedian embarks on a downward spiral that leads to the creation of an iconic villain.",
                "Genre": {
                  "Name":"Crime",
                  "Description":"Crime fiction, detective story, murder mystery, mystery novel, and police novel are terms used to describe narratives that centre on criminal acts and especially on the investigation, either by an amateur or a professional detective, of a crime, often a murder.[1] It is usually distinguished from mainstream fiction and other genres such as historical fiction or science fiction, but the boundaries are indistinct. Crime fiction has multiple subgenres,[2] including detective fiction (such as the whodunit), courtroom drama, hard-boiled fiction, and legal thrillers. Most crime drama focuses on crime investigation and does not feature the courtroom. Suspense and mystery are key elements that are nearly ubiquitous to the genre."
                },
                "Director": { 
                  "Name":"Todd Phillips",
                  "Bio":"Todd Phillips is an American filmmaker and actor who got his start by directing the comedy films Road Trip and Old School, the earlier inspired EuroTrip. He also directed Starsky & Hutch, The Hangover trilogy, Due Date, War Dogs and School for Scoundrels. Phillips directed Joker, a Taxi Driver style film set in the universe of Batman and starring Joaquin Phoenix. Joker is the highest grossing R-rated film of all time.",
                  "Birth":1970
                },
                "ImageURL":"https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg",
                "Featured":false
              }
          ]
        }
    }

    componentDidMount(){
      axios.get('https://[APP-NAME].herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }


    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie,
        });
      }
    
      render() {
        const { movies, selectedMovie } = this.state;
    
    
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
}