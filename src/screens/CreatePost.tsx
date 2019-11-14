import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';

const CreatePost = (props: any) => {
  console.log(props.navigation.state.params.files);

  return (
    <Fragment>
      <StatusBar backgroundColor="#0D62A2" barStyle="light-content" />

      <SafeAreaView style={{flex: 1}}>
        <View>
          <Text>test</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(CreatePost);
