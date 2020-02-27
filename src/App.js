import React, { useState } from "react";
import ToonApp from "./ToonApp";
import "./App.css";

const movieList = [
  {
    id: 1,
    title: "Blade runnner",
    director: "Ridley Scott",
    releaseDate: 1983,
    description: "lorem ipsum dolar si ament",
    isEditing: false
  },
  {
    id: 2,
    title: "Indiana Jones",
    director: "Steven Spielberg",
    releaseDate: 1981,
    description: "lorem ipsum dolar si ament lorem",
    isEditing: false
  },
  {
    id: 3,
    title: "Back to the future",
    director: "Steven Spielberg",
    releaseDate: 1985,
    description: "lorem ipsum dolar si ament lorem realy",
    isEditing: false
  },
  {
    id: 4,
    title: "Back to the future 2",
    director: "Steven Spielberg",
    releaseDate: 1986,
    description: "lorem ipsum dolar si ament lorem realy",
    isEditing: false
  }
];

function App() {
  const [movies, setMovies] = useState(movieList);
  const [filterText, setFilterText] = useState("");
  const [order, setOrder] = useState("desc");

  function clickHandler(id) {
    const updatedMovies = movies.map(movie =>
      movie.id === id ? { ...movie, isEditing: !movie.isEditing } : { ...movie }
    );

    setMovies(updatedMovies);
  }

  function confirmHandler({ id, title, director, releaseDate, description }) {
    const updatedMovies = movies.map(movie =>
      movie.id === id
        ? {
            ...movie,
            title,
            director,
            releaseDate,
            description,
            isEditing: false
          }
        : { ...movie }
    );

    setMovies(updatedMovies);
  }

  function changeHandler(text) {
    setFilterText(text);
  }

  function changeReleaseDateOrderHandler() {
    setOrder(order === "desc" ? "asc" : "desc");

    const clonedMovies = [...movies];

    if (order === "asc") {
      clonedMovies.sort((a, b) => a.releaseDate > b.releaseDate);
    } else {
      clonedMovies.sort((a, b) => a.releaseDate < b.releaseDate);
    }

    setMovies(clonedMovies);
  }

  function changeTitleOrderHandler() {
    setOrder(order === "desc" ? "asc" : "desc");

    const clonedMovies = [...movies];

    if (order === "desc") {
      clonedMovies.sort((a, b) => a.title > b.title);
    } else {
      clonedMovies.sort((a, b) => a.title < b.title);
    }

    setMovies(clonedMovies);
  }

  function changeOrderHandler(property) {
    setOrder(order === "desc" ? "asc" : "desc");

    const clonedMovies = [...movies];

    if (order === "desc") {
      clonedMovies.sort((a, b) => a[property] > b[property]);
    } else {
      clonedMovies.sort((a, b) => a[property] < b[property]);
    }

    setMovies(clonedMovies);
  }

  return (
    <div>
      <Filter filterText={filterText} onChange={changeHandler} />
      <table>
        <thead>
          <tr>
            <th>
              <a href="!#" onClick={changeTitleOrderHandler}>
                Title
              </a>
            </th>
            <th>
              <a href="!#" onClick={() => changeOrderHandler("director")}>
                Director
              </a>
            </th>
            <th>
              <a href="!#" onClick={changeReleaseDateOrderHandler}>
                Release date
              </a>
            </th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Release date</th>
            <th>Description</th>
            <th></th>
          </tr>
        </tfoot>
        <tbody>
          {movies
            .filter(movie => movie.title.toLowerCase().includes(filterText))
            .map(movie => (
              <Row
                key={movie.id}
                movie={movie}
                onClick={clickHandler}
                onConfirm={confirmHandler}
              />
            ))}
        </tbody>
      </table>
      <ToonApp />
    </div>
  );
}

function Row({ movie, onClick, onConfirm }) {
  const [title, setTitle] = useState(movie.title);
  const [director, setDirector] = useState(movie.director);
  const [releaseDate, setReleaseDate] = useState(movie.releaseDate);
  const [description, setDescription] = useState(movie.description);

  return (
    <tr>
      <td>
        {movie.isEditing ? (
          <input
            onChange={event => setTitle(event.target.value)}
            value={title}
          />
        ) : (
          movie.title
        )}
      </td>
      <td>
        {movie.isEditing ? (
          <input
            onChange={event => setDirector(event.target.value)}
            value={director}
          />
        ) : (
          movie.director
        )}
      </td>
      <td>
        {movie.isEditing ? (
          <input
            onChange={event => setReleaseDate(event.target.value)}
            value={releaseDate}
          />
        ) : (
          movie.releaseDate
        )}
      </td>
      <td>
        {movie.isEditing ? (
          <input
            onChange={event => setDescription(event.target.value)}
            value={description}
          />
        ) : (
          movie.description
        )}
      </td>
      <td>
        <button onClick={() => onClick(movie.id)}>
          {movie.isEditing ? "Cancel" : "Edit"}
        </button>
        {movie.isEditing && (
          <button
            onClick={() =>
              onConfirm({
                id: movie.id,
                title,
                director,
                releaseDate,
                description
              })
            }
          >
            Confirm
          </button>
        )}
      </td>
    </tr>
  );
}

function Filter({ filterText, onChange }) {
  return (
    <div>
      <input
        value={filterText}
        onChange={event => onChange(event.target.value)}
      />
    </div>
  );
}

export default App;
