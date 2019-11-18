import React, {Fragment, useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import screens from '../../libs/screens';

const Search = (props: any) => {
  const [keywords, setKeywords] = useState();

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{padding: 10, marginBottom: 10}}>
          <Input
            value={keywords}
            placeholder="Search"
            onChangeText={value => setKeywords(value)}
          />

          <Button
            title="Search"
            onPress={() => {
              props.navigation.push(screens.SearchResults, {keywords});
            }}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Search);
