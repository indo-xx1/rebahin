const genreId = '27';
const tmdbApiKey = 'e69cf3210988b5a3521ba13792cf279b'; // Ganti dengan API key TMDb Anda yang sebenarnya!
const tmdbApiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreId}`;

const movieContainerElement = document.getElementById('moviess'); // ID diubah menjadi 'moviess'

// Pastikan movieContainerElement ditemukan
if (!movieContainerElement) {
  console.error("Element with ID 'moviess' not found."); // Pesan error disesuaikan
}

fetch(tmdbApiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(movieData => {
    if (!movieData.results || movieData.results.length === 0) {
      throw new Error('Tidak ada film yang ditemukan.');
    }

    movieData.results.forEach(movie => {
      // Pastikan data yang dibutuhkan ada sebelum ditampilkan
      if (movie.title && movie.release_date && movie.backdrop_path && movie.vote_average) {
        const releaseDate = new Date(movie.release_date);
        const releaseYear = releaseDate.getFullYear();
        const movieTitleSlug = movie.title.toLowerCase().replace(/\s+/g, '-');
        const movieStreamingUrl = `/streaming-${movieTitleSlug}-${releaseYear}`;

        const movieElement = document.createElement('div');
        movieElement.classList.add('ml-item');

        movieElement.innerHTML = `
          <a href='${movieStreamingUrl}' class='ml-mask jt' title='${movie.title} (${releaseYear})'>
            <span class='mli-quality hd'>HD</span>
            <div class='rating-durasi'>
              <span class='mli-rating'><i class='bi bi-star-fill mr5'></i> ${movie.vote_average}</span>
            </div>
            <div class='mli-subtitle'><div class='mli-subtitle-id'></div></div>
            <img src='https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.backdrop_path}' class='lazy thumb mli-thumb' alt='${movie.title} (${releaseYear})'>
            <span class='mli-info'><h2>${movie.title} (${releaseYear})</h2></span>
          </a>
        `;

        movieContainerElement.appendChild(movieElement);
      } else {
        console.warn("Data film tidak lengkap:", movie);
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));