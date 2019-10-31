import {useMutation, useQuery} from '@apollo/react-hooks';
import React, {Fragment, useCallback, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SET_AUTH_USER} from '../graphql/mutation';
import {GET_AUTH_USER, LOAD_COUNTRIES} from '../graphql/query';

const SelectCountry = (props: any) => {
  const [keywords, setKeywords] = useState('');

  const {data, error} = useQuery(LOAD_COUNTRIES);
  console.log(error);

  const {data: authUser} = useQuery(GET_AUTH_USER);
  const [setAuthUser] = useMutation(SET_AUTH_USER);

  const setCountry = useCallback((item: any) => {
    setAuthUser({
      variables: {
        ...authUser.auth,
        selectedCountry: item,
      },
    });

    props.navigation.pop();
  }, []);

  const countries = data ? data.countries : [];
  const filteredCountries =
    keywords.length >= 3
      ? countries.filter((country: any) => {
          return country.name.match(new RegExp(`^${keywords}`, 'gi'));
        })
      : countries;

  const renderItem = (data: any) => {
    const {item} = data;

    return (
      <TouchableOpacity style={{padding: 10}} onPress={() => setCountry(item)}>
        <Text style={{color: '#000'}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: any, index: number) => index.toString();
  const ItemSeparatorComponent = () => (
    <View style={{height: 1, backgroundColor: '#ccc'}} />
  );

  return (
    <Fragment>
      <StatusBar backgroundColor="#0D62A2" barStyle="light-content" />

      <SafeAreaView style={{flex: 1}}>
        <View
          style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
          <TextInput
            placeholder="Filter Country"
            value={keywords}
            onChangeText={value => setKeywords(value)}
          />

          <FlatList
            keyboardShouldPersistTaps="handled"
            keyExtractor={keyExtractor}
            data={filteredCountries}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(SelectCountry);
