import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, Suspense} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AllChatrooms} from '../../generated/AllChatrooms';
import all_chatrooms from '../../graphql/types/queries/all_chatrooms';
import screens from '../../libs/screens';

const Conversation = (props: any) => {
  const {data: chatrooms} = useQuery<AllChatrooms, {}>(all_chatrooms, {
    fetchPolicy: 'cache-and-network',
  });

  console.log(chatrooms);

  return (
    <Suspense
      fallback={
        <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />
      }>
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

        <SafeAreaView style={{flex: 1}}>
          <View style={{padding: 10, marginBottom: 10}}>
            <TouchableOpacity
              onPress={() => props.navigation.push(screens.Chat)}>
              <Text>Conversation</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Fragment>
    </Suspense>
  );
};

export default React.memo(Conversation);
