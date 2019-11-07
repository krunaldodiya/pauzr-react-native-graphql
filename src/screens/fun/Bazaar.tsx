import React, {Fragment} from 'react';
import {Text, View, StatusBar, SafeAreaView} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

interface BazaarProps {
  navigation: NavigationScreenProp<any, any>;
}

const Bazaar = (props: BazaarProps) => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{padding: 10, marginBottom: 10}}>
          <Text>Bazaar</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Bazaar);
