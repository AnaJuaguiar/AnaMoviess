import { apiGet } from "../js/api.js";
 
async function init(){
    const popularMovies = await getPopular();
    populateHighlightedSection(popularMovies);
}

async function getPopular() {
    try{
        const response = await apiGet("/movie/popular?language=pt-BR");
        const popular = response.results;

        return popular;
    } catch(err) {
        return null;
    }
}

async function getMovieDetails(movieId) {
    try{
        const movie = await apiGet(`/movie/${movieId}?region=BR&language=pt-BR`);

        return movie;
    } catch(err) {
        return null;
    }
}

function populateHighlightedSection(popularMovies) {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const banners = $("#banners");

    popularMovies.forEach(async(movie) => {
        const movieDetails = await getMovieDetails(movie.id);

        if(movie.poster_path && movieDetails.homepage) {
            const banner = `
                
            <div class="col-lg-3 col-sm-12 mb-3">
            <ul class="flip">
            <li>
                <figure>

                    <a href="https://www.imdb.com/title/${movieDetails.imdb_id}" target="_blank">
                    
                        <img class="movies-banner" src="${imageBaseUrl + movie.poster_path}" alt="${movie.title}">
                        </a>
                        <figcaption>
                            <h2>${movie.title}</h2>
                            <p>Nota no IMDB: ${movieDetails.vote_average}</p>
                            <p>Tempo: ${movieDetails.runtime + " minutos"}</p>
                        </figcaption>
                    
                    </li>
                    </ul>
                </div>
            `;

            banners.append(banner);
        }
    });
}

export default init;