import {useMutation, useQuery} from '@apollo/react-hooks';
import React, {Fragment, useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SET_COUNTRY} from '../graphql/mutation';
import {LOAD_COUNTRIES} from '../graphql/query';

const SelectCountry = (props: any) => {
  const [keywords, setKeywords] = useState('');

  const {data: countries, loading: loadingCountries} = useQuery(
    LOAD_COUNTRIES,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  const [setCountry] = useMutation(SET_COUNTRY);

  const setSelectedCountry = useCallback(async (item: any) => {
    try {
      await setCountry({
        variables: {
          country: item,
        },
      });

      props.navigation.pop();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getFilteredCountries = () => {
    return keywords.length >= 3
      ? countries.countries.filter((country: any) => {
          return country.name.match(new RegExp(`^${keywords}`, 'gi'));
        })
      : countries.countries;
  };

  const renderItem = (data: any) => {
    const {item} = data;

    return (
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => {
          setSelectedCountry(item);
        }}>
        <Text style={{color: '#000'}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: any, index: number) => index.toString();
  const ItemSeparatorComponent = () => (
    <View style={{height: 1, backgroundColor: '#ccc'}} />
  );

  if (loadingCountries) {
    return <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />;
  }

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
            data={getFilteredCountries()}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(SelectCountry);
