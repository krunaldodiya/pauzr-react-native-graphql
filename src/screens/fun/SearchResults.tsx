import React from 'react';
import {View, Text} from 'react-native';

const SearchResults = (props: any) => {
  const params = props.navigation.state.params;

  return (
    <View style={{flex: 1}}>
      <Text>{params.keywords}</Text>
    </View>
  );
};

export default SearchResults;
