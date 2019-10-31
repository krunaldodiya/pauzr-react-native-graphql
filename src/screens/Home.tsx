import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';

const Home = () => (
  <Fragment>
    <StatusBar backgroundColor="#0D62A2" barStyle="light-content" />

    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  </Fragment>
);

export default React.memo(Home);
