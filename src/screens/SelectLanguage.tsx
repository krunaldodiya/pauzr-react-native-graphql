import {useMutation, useQuery} from '@apollo/react-hooks';
import React, {Fragment, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {EDIT_PROFILE, SET_INITIAL_SCREEN} from '../graphql/mutation';
import {GET_AUTH_USER, GET_LANGUAGES} from '../graphql/query';
import screens from '../libs/screens';
import theme from '../libs/theme';

const SelectLanguage = (props: any) => {
  const {navigation} = props;

  const {data: authUser} = useQuery(GET_AUTH_USER);
  const {data: languages, loading: loadingLanguages} = useQuery(GET_LANGUAGES, {
    fetchPolicy: 'cache-and-network',
  });
  const [editProfile, {loading}] = useMutation(EDIT_PROFILE);

  const [selectedLanguage, setSelectedLanguage] = useState();

  const [setInitialScreen] = useMutation(SET_INITIAL_SCREEN);

  const setLanguage = async () => {
    await editProfile({
      variables: {
        language: selectedLanguage,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        editProfile: {
          __typename: 'User',
          ...authUser.me,
          language: selectedLanguage,
        },
      },
    });

    await setInitialScreen({variables: {initialScreen: screens.Home}});

    navigation.replace(screens.Home);
  };

  const keyExtractor = (item: any, index: number) => index.toString();

  const renderItem = (data: any) => {
    const {item} = data;

    const selectedColor = selectedLanguage == item.shortname ? 'red' : 'black';

    return (
      <TouchableOpacity
        style={styles.language}
        onPress={() => setSelectedLanguage(item.shortname)}>
        <Text
          style={[
            styles.text,
            {
              color: selectedColor,
            },
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loadingLanguages) {
    return <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />;
  }

  return (
    <Fragment>
      <StatusBar backgroundColor="#0D62A2" barStyle="light-content" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 22, textAlign: 'center'}}>
            Select Language
          </Text>
        </View>

        <View style={{flex: 1, padding: 10}}>
          <FlatList
            data={languages.languages}
            extraData={authUser}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>

        <View style={{padding: 10}}>
          <Button
            title="Continue"
            onPress={setLanguage}
            loading={loading}
            disabled={loading}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  language: {
    margin: 2,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fonts.TitilliumWebRegular,
  },
});

export default React.memo(SelectLanguage);
