let movies = JSON.parse(localStorage.getItem("movies")) || [];

let editIndex = -1;

const movieForm = document.getElementById("movieForm");
const movieContainer = document.getElementById("movieContainer");
const submitButton = document.getElementById("submitButton");

const title = document.getElementById("title");
const poster = document.getElementById("poster");
const genre = document.getElementById("genre");
const year = document.getElementById("year");
const rating = document.getElementById("rating");
const status = document.getElementById("status");


movieForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const movie = {
        title: title.value,
        poster: poster.value,
        genre: genre.value,
        year: year.value,
        rating: rating.value,
        status: status.value
    };

    if (editIndex === -1) {

        
        movies.push(movie);

    } else {

        
        movies[editIndex] = movie;

        editIndex = -1;

        submitButton.innerText = "Add Movie";
    }

    saveMovies();

    movieForm.reset();

    displayMovies();
});



function displayMovies() {

    movieContainer.innerHTML = "";

    movies.forEach(function(movie, index) {

        const card = document.createElement("div");

        card.className = "movie-card";

        card.innerHTML = `
            <img src="${movie.poster}"
                 alt="${movie.title}"
                 onerror="this.src='https://via.placeholder.com/300x400?text=No+Image'">

            <h2>${movie.title} (${movie.year})</h2>

            <p>🎬 Theme: ${movie.genre}</p>

            <p>⭐ Rating: ${movie.rating}/10</p>

            <p class="${movie.status === 'Watched'
                ? 'watched'
                : 'not-watched'}">

                ${movie.status === "Watched"
                    ? "📗 Watched"
                    : "📘 Not Watched"}

            </p>

            <div class="actions">

                <button class="edit-btn"
                        onclick="editMovie(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                        onclick="deleteMovie(${index})">
                    Delete
                </button>

            </div>
        `;

        movieContainer.appendChild(card);
    });
}



function editMovie(index) {

    const movie = movies[index];

    title.value = movie.title;
    poster.value = movie.poster;
    genre.value = movie.genre;
    year.value = movie.year;
    rating.value = movie.rating;
    status.value = movie.status;

    editIndex = index;

    submitButton.innerText = "Update Movie";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}



function deleteMovie(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this movie?");

    if (confirmDelete) {

        movies.splice(index, 1);

        saveMovies();

        displayMovies();
    }
}



function saveMovies() {

    localStorage.setItem(
        "movies",
        JSON.stringify(movies)
    );
}



displayMovies();