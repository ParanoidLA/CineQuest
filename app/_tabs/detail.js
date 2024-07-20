import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { fetchMovieDetails, fetchMovieTrailer, fetchTVShowDetails, fetchTVShowTrailer } from '../../utils/api';
import { useUser } from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = () => {
  const { movieId, tvShowId } = useLocalSearchParams();
  const { watched, setWatched, toWatch, setToWatch } = useUser();

  const [details, setDetails] = useState(null);
  const [trailerId, setTrailerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        if (movieId) {
          const movieDetails = await fetchMovieDetails(movieId);
          const trailer = await fetchMovieTrailer(movieId);
          
          setDetails(movieDetails);
          setTrailerId(trailer);
        } else if (tvShowId) {
          const tvShowDetails = await fetchTVShowDetails(tvShowId);
          const trailer = await fetchTVShowTrailer(tvShowId);
          
          setDetails(tvShowDetails);
          setTrailerId(trailer);
        }
      } catch (error) {
        console.error('Failed to fetch details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [movieId, tvShowId]);

  const handleMarkAsWatched = async () => {
    if (details) {
      const newWatched = [...watched, details];
      setWatched(newWatched);
      await AsyncStorage.setItem('watched', JSON.stringify(newWatched));
    }
  };

  const handleMarkAsToWatch = async () => {
    if (details) {
      const newToWatch = [...toWatch, details];
      setToWatch(newToWatch);
      await AsyncStorage.setItem('toWatch', JSON.stringify(newToWatch));
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!details) {
    return <Text style={styles.text}>No details available</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {trailerId ? (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${trailerId}` }}
            style={styles.video}
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback

            onError={(error) => console.error('WebView error:', error)}
          />
        </View>
      ) : (
        <Text style={styles.noTrailerText}>No trailer available</Text>
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{details.title || details.name}</Text>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.text}>{details.overview}</Text>
        <Text style={styles.sectionTitle}>Rating</Text>
        <Text style={styles.text}>{details.vote_average}</Text>
        <Text style={styles.sectionTitle}>Release Date</Text>
        <Text style={styles.text}>{details.release_date || details.first_air_date}</Text>
        <Text style={styles.sectionTitle}>Runtime</Text>
        <Text style={styles.text}>{details.runtime ? `${details.runtime} minutes` : 'N/A'}</Text>
        <Text style={styles.sectionTitle}>Genres</Text>
        <Text style={styles.text}>{details.genres.map((genre) => genre.name).join(', ')}</Text>
        <Text style={styles.sectionTitle}>Production Companies</Text>
        <Text style={styles.text}>{details.production_companies?.map((company) => company.name).join(', ') || 'N/A'}</Text>
        <Text style={styles.sectionTitle}>Budget</Text>
        <Text style={styles.text}>{details.budget ? `$${details.budget.toLocaleString()}` : 'N/A'}</Text>
        <Text style={styles.sectionTitle}>Revenue</Text>
        <Text style={styles.text}>{details.revenue ? `$${details.revenue.toLocaleString()}` : 'N/A'}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleMarkAsWatched}>
            <Text style={styles.buttonText}>Mark as Watched</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleMarkAsToWatch}>
            <Text style={styles.buttonText}>Mark as To Watch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212', // Dark background color
  },
  videoContainer: {
    height: 300,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
    paddingTop: 16, // Padding above the trailer
  },
  video: {
    flex: 1,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffffff', // Text color for dark theme
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#ffffff', // Text color for dark theme
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#ffffff', // Text color for dark theme
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noTrailerText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
  },
});

export default DetailScreen;
