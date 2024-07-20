import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchPopularMovies, fetchRecommendedMovies } from '../../utils/api';
import MovieCard from '../components/MovieCard';
import Carousel from '../components/Carousel';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

const Movies = () => {
  const router = useRouter();
  const { theme } = useTheme();  // Access the current theme
  const [popularMovies, setPopularMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const popularData = await fetchPopularMovies();
      const recommendedData = await fetchRecommendedMovies();
      setPopularMovies(popularData);
      setRecommendedMovies(recommendedData);
    };

    loadData();
  }, []);

  const renderMovieCard = ({ item }) => {
    const onPressHandler = () => {
      router.push({ pathname: '/detail', params: { movieId: item.id } });
    };

    return (
      <MovieCard
        movie={item}
        onPress={onPressHandler}
      />
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF' }]}>
      <View style={styles.topPadding} />
      <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#FFFFFF' : '#000000' }]}>Recommended Movies</Text>
      <Carousel data={recommendedMovies} renderItem={renderMovieCard} />

      <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#FFFFFF' : '#000000' }]}>Popular Movies</Text>
      <Carousel data={popularMovies} renderItem={renderMovieCard} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topPadding: {
    paddingTop: 26, // Adjust the padding value as needed
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

export default Movies;
