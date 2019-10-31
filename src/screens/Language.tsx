import {useMutation, useQuery} from '@apollo/react-hooks';
import React, {Fragment, useCallback} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SET_AUTH_USER} from '../graphql/mutation';
import {GET_AUTH_USER} from '../graphql/query';
import screens from '../libs/screens';
import theme from '../libs/theme';

const languages = [
  {name: 'English', shortname: 'en'},
  {name: 'ગુજરાતી', shortname: 'gu'},
  {name: 'હિન્દી', shortname: 'hi'},
];

const Language = (props: any) => {
  const {navigation} = props;

  const {data: authUser} = useQuery(GET_AUTH_USER);
  const [setAuthUser] = useMutation(SET_AUTH_USER);

  const renderItem = (data: any) => {
    const {item} = data;

    const selectedColor =
      authUser.auth.selectedLanguage == item.shortname ? 'red' : 'black';

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

  const browseRequestOtp = () => {
    navigation.replace(screens.RequestOtp);
  };

  const setSelectedLanguage = useCallback((item: any) => {
    setAuthUser({
      variables: {
        ...authUser.auth,
        selectedLanguage: item,
      },
    });
  }, []);

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
            data={languages}
            extraData={authUser}
            renderItem={renderItem}
          />
        </View>

        <View style={{padding: 10}}>
          <Button title="Continue" onPress={browseRequestOtp} />
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

export default React.memo(Language);
