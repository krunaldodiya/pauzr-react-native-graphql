import {useMutation, useQuery, useSubscription} from '@apollo/react-hooks';
import produce from 'immer';
import React, {Fragment, Suspense, useState, useRef} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Header, Icon, ListItem} from 'react-native-elements';
import {FlatList} from 'react-navigation';
import {PrivateMessageAdded} from 'src/generated/PrivateMessageAdded';
import uuidv4 from 'uuid/v4';
import {
  addPrivateMessage,
  addPrivateMessageVariables,
} from '../../../generated/addPrivateMessage';
import {GetAuthUser} from '../../../generated/GetAuthUser';
import {
  PrivateChatroom,
  PrivateChatroomVariables,
  PrivateChatroom_private_chatroom_chats,
} from '../../../generated/PrivateChatroom';
import add_private_message from '../../../graphql/types/mutations/add_private_message';
import get_auth_user from '../../../graphql/types/queries/get_auth_user';
import private_chatroom from '../../../graphql/types/queries/private_chatroom';
import private_message_added from '../../../graphql/types/subscriptions/private_message_added';
import {U} from '../../../libs/vars';
import ss from './ChatStyle';

const Chat = (props: any) => {
  const uuid = uuidv4();
  const flatListRef = useRef();

  const [message, setMessage] = useState('');

  const [addPrivateMessage] = useMutation<
    addPrivateMessage,
    addPrivateMessageVariables
  >(add_private_message);

  const {data: authUser}: any = useQuery<GetAuthUser, {}>(get_auth_user, {
    fetchPolicy: 'cache-and-network',
  });

  const {data: chat, loading} = useQuery<
    PrivateChatroom,
    PrivateChatroomVariables
  >(private_chatroom, {
    fetchPolicy: 'cache-and-network',
    variables: {
      friend_id: props.navigation.state.params.friend_id,
    },
  });

  const {data: pmAdded, error: pmError} = useSubscription<
    PrivateMessageAdded,
    {}
  >(private_message_added);

  if (loading && !chat) {
    return <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />;
  }

  const friend = data => {
    return chat.private_chatroom.subscribers.filter((subscriber: any) => {
      return subscriber.id != authUser.me.id;
    })[0][data];
  };

  return (
    <Suspense
      fallback={
        <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />
      }>
      <Fragment>
        <Header
          style={{flex: 1}}
          statusBarProps={{
            backgroundColor: '#0D62A2',
            translucent: true,
          }}
          backgroundColor="#0D62A2"
          placement="center"
          leftContainerStyle={{
            alignItems: 'center',
          }}
          leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            onPress: () => {
              props.navigation.pop();
            },
          }}
          centerComponent={
            <ListItem
              key={friend('id')}
              titleStyle={{color: 'white'}}
              subtitleStyle={{color: 'lightgreen', fontSize: 12}}
              containerStyle={{
                backgroundColor: 'transparent',
                alignSelf: 'flex-start',
              }}
              leftAvatar={{
                source: {
                  uri: friend('avatar'),
                },
              }}
              title={friend('name')}
              subtitle="online"
              bottomDivider
            />
          }
        />
        <SafeAreaView style={{flex: 1}}>
          <View style={ss.mainContainer}>
            <FlatList
              ref={flatListRef}
              contentContainerStyle={ss.messagesContainer}
              data={chat.private_chatroom.chats}
              renderItem={(data: {
                item: PrivateChatroom_private_chatroom_chats;
              }) => {
                const {item} = data;

                return (
                  <View
                    key={item.id}
                    style={[
                      ss.Message,
                      item.sender.id == authUser.me.id && ss.Message_fromMe,
                    ]}>
                    <Image
                      style={ss.Message__avatar}
                      source={{uri: item.sender.avatar}}
                    />
                    <Text style={ss.Message__text}>{item.text}</Text>
                  </View>
                );
              }}
            />

            <View style={ss.inputContainer}>
              <TextInput
                style={ss.input}
                multiline
                value={message}
                onChangeText={message => setMessage(message)}
              />

              <Icon
                name="sc-telegram"
                type="evilicon"
                color="hsl(0, 0%, 24%)"
                size={2 * 0.64 * U}
                containerStyle={ss.send}
                onPress={async () => {
                  addPrivateMessage({
                    variables: {
                      id: uuid,
                      text: message,
                      chatroom_id: chat.private_chatroom.id,
                    },
                    update: (store, {data}) => {
                      const chatroom: any = store.readQuery({
                        query: private_chatroom,
                        variables: {
                          friend_id: props.navigation.state.params.friend_id,
                        },
                      });

                      store.writeQuery({
                        query: private_chatroom,
                        variables: {
                          friend_id: props.navigation.state.params.friend_id,
                        },
                        data: produce(chatroom, (x: any) => {
                          x.private_chatroom.chats.push(
                            data!.addPrivateMessage,
                          );
                        }),
                      });

                      flatListRef?.current.scrollToEnd({animated: false});
                    },
                    optimisticResponse: {
                      addPrivateMessage: {
                        __typename: 'Chat',
                        id: uuid,
                        sender: {
                          __typename: 'User',
                          id: authUser.me.id,
                          name: authUser.me.name,
                          avatar: authUser.me.avatar,
                        },
                        text: message,
                      },
                    },
                  });

                  setMessage('');
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    </Suspense>
  );
};

export default React.memo(Chat);
