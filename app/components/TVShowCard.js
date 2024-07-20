import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

const TVShowCard = ({ show, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.shadowContainer}>
        <Card style={styles.card}>
          <Card.Cover
            source={{ uri: `https://image.tmdb.org/t/p/w500/${show.poster_path}` }}
            style={styles.cover}
          />
          <Card.Content style={styles.content}>
            <Title style={styles.title}>{show.name}</Title>
            <Paragraph style={styles.paragraph}>Rating: {show.vote_average}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150, // Fixed width
    margin: 8,
  },
  shadowContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3, // Adjust shadow elevation
  },
  card: {
    flex: 1,
    borderRadius: 8,
  },
  cover: {
    width: '100%',
    height: 200, // Fixed height for the cover
  },
  content: {
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 14,
    color: 'grey',
  },
});

export default TVShowCard;
