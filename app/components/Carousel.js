import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const Carousel = ({ data, renderItem }) => {
  const { width } = Dimensions.get('window');

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.75} // Adjust for card width
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    paddingVertical: 10,
  },
});

export default Carousel;
