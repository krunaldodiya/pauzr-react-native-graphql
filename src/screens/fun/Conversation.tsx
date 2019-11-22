import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import screens from '../../libs/screens';

const Conversation = (props: any) => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{padding: 10, marginBottom: 10}}>
          <TouchableOpacity onPress={() => props.navigation.push(screens.Chat)}>
            <Text>Conversation</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Conversation);
