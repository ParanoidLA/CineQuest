import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { fetchPopularMovies, fetchPopularTVShows, fetchSearchResults } from '../../utils/api';
import MovieCard from '../components/MovieCard';
import TVShowCard from '../components/TVShowCard';
import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';
import { Text, useTheme as usePaperTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

const HomeScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const paperTheme = usePaperTheme();
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const popularMovies = await fetchPopularMovies();
      const popularTVShows = await fetchPopularTVShows();
      setMovies(popularMovies);
      setTVShows(popularTVShows);
    };

    loadData();
  }, []);

  const handleQueryChange = (newQuery) => {
    setSearchQuery(newQuery);
  };

  const handleQuerySubmit = async () => {
    try {
      const results = await fetchSearchResults(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTVShows = tvShows.filter(show =>
    show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMovieCard = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => router.push(`/detail?movieId=${item.id}`)}
    />
  );

  const renderTVShowCard = ({ item }) => (
    <TVShowCard
      show={item}
      onPress={() => router.push(`/detail?tvShowId=${item.id}`)}
    />
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: paperTheme.colors.background }]}>
      <Text style={[styles.appTitle, { color: theme === 'dark' ? '#FFFFFF' : '#000000' }]}>CineQuest</Text>
      <SearchBar 
        query={searchQuery} 
        onQueryChange={handleQueryChange} 
        onQuerySubmit={handleQuerySubmit} 
      />

      {searchQuery ? (
        <>
          <Text style={[styles.sectionTitle, { color: paperTheme.colors.text }]}>Search Results</Text>
          {searchResults.length > 0 ? (
            <>
              <Carousel data={searchResults.filter(result => result.media_type === 'movie')} renderItem={renderMovieCard} />
              <Carousel data={searchResults.filter(result => result.media_type === 'tv')} renderItem={renderTVShowCard} />
            </>
          ) : (
            <Text style={[styles.noResultsText, { color: paperTheme.colors.text }]}>No results found</Text>
          )}
        </>
      ) : (
        <>
          <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#FFFFFF' : '#000000' }]}>Popular Movies</Text>
          <Carousel data={filteredMovies} renderItem={renderMovieCard} />

          <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#FFFFFF' : '#000000' }]}>Popular TV Shows</Text>
          <Carousel data={filteredTVShows} renderItem={renderTVShowCard} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'left',
    paddingTop: 25
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: 'grey', // Consider changing this if it's not adapting well
    marginTop: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
