import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';

const Groups = (props: any) => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{padding: 10, marginBottom: 10}}>
          <Text>Groups</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Groups);
