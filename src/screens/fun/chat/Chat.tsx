import {useMutation, useQuery, useSubscription} from '@apollo/react-hooks';
import React, {Fragment, Suspense, useEffect, useState} from 'react';
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
import {
  addPrivateMessage,
  addPrivateMessageVariables,
} from '../../../generated/addPrivateMessage';
import {GetAuthUser} from '../../../generated/GetAuthUser';
import {MessageAdded} from '../../../generated/MessageAdded';
import {
  PrivateChatroom,
  PrivateChatroomVariables,
} from '../../../generated/PrivateChatroom';
import add_private_message from '../../../graphql/types/mutations/add_private_message';
import get_auth_user from '../../../graphql/types/queries/get_auth_user';
import private_chatroom from '../../../graphql/types/queries/private_chatroom';
import message_added from '../../../graphql/types/subscriptions/message_added';
import {U} from '../../../libs/vars';
import ss from './ChatStyle';

const Chat = (props: any) => {
  const [message, setMessage] = useState('');
  const subscription = useSubscription<MessageAdded, {}>(message_added);
  console.log(subscription, 'subscription');

  const [addPrivateMessage] = useMutation<
    addPrivateMessage,
    addPrivateMessageVariables
  >(add_private_message);

  const {data: authUser}: any = useQuery<GetAuthUser, {}>(get_auth_user, {
    fetchPolicy: 'cache-and-network',
  });

  const {data: chat}: any = useQuery<PrivateChatroom, PrivateChatroomVariables>(
    private_chatroom,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        friend_id: props.navigation.state.params.friend_id,
        per_page: 100,
      },
    },
  );

  const friend = (data: string) => {
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
              contentContainerStyle={ss.messagesContainer}
              data={chat.private_chatroom.chats.data}
              renderItem={({item}) => {
                return (
                  <View
                    key={item.id}
                    style={[
                      ss.Message,
                      item.sender_id == authUser.me.id && ss.Message_fromMe,
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
                      text: message,
                      chatroom_id: chat.private_chatroom.id,
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
