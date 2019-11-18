import {useLazyQuery} from '@apollo/react-hooks';
import React, {useState} from 'react';
import {FlatList, TextInput, View, Text} from 'react-native';
import {Icon, Image, Button} from 'react-native-elements';
import {SEARCH_USERS} from '../../graphql/query';

const SearchResults = (props: any) => {
  const [keywords, setKeywords] = useState('');

  const [searchUsers, {data}] = useLazyQuery(SEARCH_USERS, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#ccc',
        }}>
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
            return (
              <View
                style={{
                  margin: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'skyblue',
                  borderRadius: 10,
                }}>
                <View style={{marginHorizontal: 5}}>
                  <Image
                    source={{uri: data.item.avatar}}
                    style={{width: 40, height: 40}}
                  />
                </View>

                <View
                  style={{flex: 1, padding: 5, justifyContent: 'space-evenly'}}>
                  <Text style={{fontSize: 16, textTransform: 'none'}}>
                    {data.item.name}
                  </Text>
                  <Text style={{fontSize: 12, color: '#3c84a7'}}>
                    @{data.item.username}
                  </Text>
                </View>

                <View style={{marginRight: 10}}>
                  <Button
                    buttonStyle={{width: 80, height: 35, borderRadius: 10}}
                    title="Follow"
                    onPress={() => null}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default SearchResults;
