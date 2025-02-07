
const ide = '28';
const apiKey = 'e69cf3210988b5a3521ba13792cf279b';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${ide}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const movieContainer = document.getElementById('movies');
    
    data.results.forEach(row => {
      const date = new Date(row.release_date);
      const year = date.getFullYear();
      const titleSlug = row.title.toLowerCase().replace(/\s+/g, '-');
      const movieUrl = `/nonton`;
      
      const movieElement = document.createElement('div');
      movieElement.classList.add('ml-item');
      movieElement.innerHTML = `
        <a href='${movieUrl}' class='ml-mask jt' title='${row.title} (${year})'>
          <span class='mli-quality hd'>HD</span>
          <div class='rating-durasi'>
            <span class='mli-rating'><i class='bi bi-star-fill mr5'></i> ${row.vote_average}</span>
          </div>
          <div class='mli-subtitle'><div class='mli-subtitle-id'></div></div>
          <img src='https://www.themoviedb.org/t/p/w220_and_h330_face/${row.backdrop_path}' class='lazy thumb mli-thumb' alt='${row.title} (${year})'>
          <span class='mli-info'><h2>${row.title} (${year})</h2></span>
        </a>
      `;
      
      movieContainer.appendChild(movieElement);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
