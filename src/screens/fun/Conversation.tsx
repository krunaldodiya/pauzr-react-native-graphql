import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, Suspense} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {
  AllChatrooms,
  AllChatrooms_all_chatrooms,
} from '../../generated/AllChatrooms';
import {GetAuthUser} from '../../generated/GetAuthUser';
import all_chatrooms from '../../graphql/types/queries/all_chatrooms';
import get_auth_user from '../../graphql/types/queries/get_auth_user';
import screens from '../../libs/screens';

const Conversation = (props: any) => {
  const {data: chatrooms} = useQuery<AllChatrooms, {}>(all_chatrooms, {
    fetchPolicy: 'cache-and-network',
  });

  const {data: authUser} = useQuery<GetAuthUser, {}>(get_auth_user, {
    fetchPolicy: 'cache-and-network',
  });

  const renderItem = (data: {item: AllChatrooms_all_chatrooms}) => {
    const {item} = data;

    const friend = (data: string) => {
      return item?.subscribers?.filter((subscriber: any) => {
        return subscriber?.id != authUser?.me?.id;
      })[0][data];
    };

    return (
      <ListItem
        onPress={() =>
          props.navigation.push(screens.Chat, {friend_id: friend('id')})
        }
        key={item.id}
        leftAvatar={{
          source: {
            uri:
              item.chatroom_type == 'Private' ? friend('avatar') : 'item.image',
          },
        }}
        title={
          item.chatroom_type == 'Private' ? friend('name') : item.chatroom_name
        }
        subtitle="test"
        bottomDivider
      />
    );
  };

  const keyExtractor = (item: any, index: number) => index.toString();

  return (
    <Suspense
      fallback={
        <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />
      }>
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <FlatList
              data={chatrooms ? chatrooms?.all_chatrooms : []}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    </Suspense>
  );
};

export default React.memo(Conversation);
