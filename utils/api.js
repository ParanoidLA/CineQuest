import axios from 'axios';

const API_KEY = '9005d7d3f4f30fa7f744e1392c061c4a';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};


// Function to fetch popular movies
export const fetchPopularMovies = async () => {
  try {
    const response = await api.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Function to fetch recommended movies
export const fetchRecommendedMovies = async () => {
  try {
    const response = await api.get('/movie/top_rated');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    throw error;
  }
};

// Function to fetch popular TV shows
export const fetchPopularTVShows = async () => {
  try {
    const response = await api.get('/tv/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    throw error;
  }
};

// Function to fetch movie details by ID
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Function to fetch TV show details by ID
export const fetchTVShowDetails = async (tvShowId) => {
  try {
    const response = await api.get(`/tv/${tvShowId}`, {
      params: {
        append_to_response: 'videos',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    throw error;
  }
};


export const fetchTVShowTrailer = async (tvShowId) => {
  try {
    const response = await api.get(`/tv/${tvShowId}/videos`);
    const trailers = response.data.results.filter(video => video.site === 'YouTube' && video.type === 'Trailer');
    return trailers.length ? trailers[0].key : null;
  } catch (error) {
    console.error('Failed to fetch TV show trailer:', error);
    throw error;
  }
};

// Function to fetch recommended TV shows
export const fetchRecommendedTvShows = async () => {
  try {
    const response = await api.get(`/tv/top_rated`);
    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch recommended TV shows:', error);
    throw error;
  }
};

// Function to fetch movie trailer
export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`, {
      params: {
        language: 'en-US',
      },
    });
    const trailers = response.data.results.filter(
      (video) => video.site === 'YouTube' && video.type === 'Trailer'
    );
    return trailers.length ? trailers[0].key : null;
  } catch (error) {
    console.error('Failed to fetch movie trailer:', error);
    throw error;
  }
};
export const fetchTVshowTrailer = async (tvshowId) => {
  try {
    const response = await api.get(`/tv/${tvshowId}/videos`, {
      params: {
        language: 'en-US',
      },
    });
    const trailers = response.data.results.filter(
      (video) => video.site === 'YouTube' && video.type === 'Trailer'
    );
    return trailers.length ? trailers[0].key : null;
  } catch (error) {
    console.error('Failed to fetch TV Show trailer:', error);
    throw error;
  }
};
