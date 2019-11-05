import {useMutation, useQuery} from '@apollo/react-hooks';
import React, {Fragment, useCallback} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {EDIT_PROFILE, SET_AUTH_USER} from '../graphql/mutation';
import {GET_AUTH_USER} from '../graphql/query';
import screens from '../libs/screens';
import theme from '../libs/theme';

const languages = [
  {name: 'English', shortname: 'en'},
  {name: 'ગુજરાતી', shortname: 'gu'},
  {name: 'હિન્દી', shortname: 'hi'},
];

const SelectLanguage = (props: any) => {
  const {navigation} = props;

  const {data: authUser} = useQuery(GET_AUTH_USER);
  const [setAuthUser] = useMutation(SET_AUTH_USER);
  const [editProfile, {loading}] = useMutation(EDIT_PROFILE);

  const renderItem = (data: any) => {
    const {item} = data;

    const selectedColor =
      authUser.user.language == item.shortname ? 'red' : 'black';

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

  const browseRequestOtp = async () => {
    await editProfile({
      variables: {
        language: authUser.user.language,
      },
    });

    navigation.replace(screens.Home);
  };

  const setSelectedLanguage = useCallback((item: any) => {
    setAuthUser({
      variables: {
        authUser: {
          ...authUser.user,
          language: item,
        },
      },
    });
  }, []);

  const keyExtractor = (item: any, index: number) => index.toString();

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
            keyExtractor={keyExtractor}
          />
        </View>

        <View style={{padding: 10}}>
          <Button
            title="Continue"
            onPress={browseRequestOtp}
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
