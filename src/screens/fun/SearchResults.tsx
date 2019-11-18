import {useLazyQuery} from '@apollo/react-hooks';
import React, {useState} from 'react';
import {FlatList, TextInput, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {SEARCH_USERS} from '../../graphql/query';

const SearchResults = (props: any) => {
  const [keywords, setKeywords] = useState('');

  const [searchUsers, {data}] = useLazyQuery(SEARCH_USERS);

  return (
    <View style={{flex: 1}}>
      <View>
        <Icon name="search" type="evilicon" color="hsl(0, 0%, 24%)" />
        <TextInput
          placeholder="find people"
          value={keywords}
          onChangeText={value => {
            setKeywords(value);

            if (keywords.length) {
              searchUsers({variables: {keywords: value, first: 10}});
            }
          }}
        />
      </View>

      <View>
        <FlatList
          data={data ? data.searchUsers.data : []}
          renderItem={(data: any) => {
            return <Text>{data.item.name}</Text>;
          }}
        />
      </View>
    </View>
  );
};

export default SearchResults;
