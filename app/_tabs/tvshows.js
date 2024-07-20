import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchPopularTVShows, fetchRecommendedTvShows } from '../../utils/api';
import TVShowCard from '../components/TVShowCard'; // Ensure this component exists
import Carousel from '../components/Carousel';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext'; // Import the ThemeContext

const TVShows = () => {
  const router = useRouter();
  const { theme } = useTheme(); // Access the current theme
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [recommendedTVShows, setRecommendedTVShows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const popularData = await fetchPopularTVShows();
        const recommendedData = await fetchRecommendedTvShows();
        setPopularTVShows(popularData);
        setRecommendedTVShows(recommendedData);
      } catch (error) {
        console.error('Failed to load TV shows:', error);
        setError(error.message);
      }
    };

    loadData();
  }, []);

  const renderTVShowCard = ({ item }) => (
    <TVShowCard
      show={item}
      onPress={() => router.push(`/detail?tvShowId=${item.id}`)}
    />
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, { color: theme === 'dark' ? '#FFFFFF' : '#FF0000' }]}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF' }]}>
      <View style={styles.topPadding} />
      <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#FFFFFF' : '#000000' }]}>Recommended TV Shows</Text>
      <Carousel data={recommendedTVShows} renderItem={renderTVShowCard} />

      <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#FFFFFF' : '#000000' }]}>Popular TV Shows</Text>
      <Carousel data={popularTVShows} renderItem={renderTVShowCard} />
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  },
});

export default TVShows;
