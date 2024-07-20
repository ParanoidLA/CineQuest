import React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({ query, onQueryChange, onQuerySubmit }) => {
  return (
    <Searchbar
      placeholder="Search"
      value={query}
      onChangeText={onQueryChange}
      onSubmitEditing={onQuerySubmit}
      style={{ margin: 8 }}
    />
  );
};

export default SearchBar;
