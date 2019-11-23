import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, Suspense} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Icon, Header, ListItem} from 'react-native-elements';
import {NavigationScreenProp, ScrollView} from 'react-navigation';
import {
  PrivateChatroom,
  PrivateChatroomVariables,
} from '../../../generated/PrivateChatroom';
import private_chatroom from '../../../graphql/types/queries/private_chatroom';
import {U} from '../../../libs/vars';
import ss from './ChatStyle';
import get_auth_user from '../../../graphql/types/queries/get_auth_user';
import {GetAuthUser} from '../../../generated/GetAuthUser';

const avatarsMap = [
  'https://picsum.photos/id/63/500/500',
  'https://picsum.photos/id/64/500/500',
];

const messagesSample = [
  {
    // fromMe: true,
    message: 'Hello stranger!',
    time: '01:34',
    avatarMapIndex: 0,
  },
  {
    fromMe: true,
    message: 'Hi!',
    time: '01:35',
    avatarMapIndex: 1,
  },
  {
    // fromMe: true,
    message:
      'It’s Baijiu, a strong clear Chinese alcohol. I like that, have an empty bottle from a trip to Shanghai',
    time: '01:35',
    avatarMapIndex: 0,
  },
  {
    fromMe: true,
    message: 'could you mix it with anything?',
    time: '01:36',
    avatarMapIndex: 1,
  },
  {
    // fromMe: true,
    message: 'Nobody does but you can try',
    time: '01:37',
    avatarMapIndex: 0,
  },
  {
    // fromMe: true,
    message:
      'Mix with a slightly grainy, but otherwise neutral lagers (you know...the cheap stuff) and the aroma of the baijiu just pops out. It’s actually fantastic.',
    time: '01:37',
    avatarMapIndex: 0,
  },
];

const Chat = (props: any) => {
  const {data: authUser}: any = useQuery<GetAuthUser, {}>(get_auth_user, {
    fetchPolicy: 'cache-and-network',
  });

  const {data: chat}: any = useQuery<PrivateChatroom, PrivateChatroomVariables>(
    private_chatroom,
    {
      fetchPolicy: 'cache-and-network',
      variables: {friend_id: props.navigation.state.params.friend_id},
    },
  );

  const friend = (data: string) => {
    return chat.private_chatroom.subscribers.filter((subscriber: any) => {
      return subscriber.id != authUser.me.id;
    })[0][data];
  };

  console.log(friend('name'));

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
            <ScrollView contentContainerStyle={ss.messagesContainer}>
              {messagesSample.map(message => {
                return (
                  <View
                    key={message.message + message.time}
                    style={[ss.Message, message.fromMe && ss.Message_fromMe]}>
                    <Image
                      style={ss.Message__avatar}
                      source={{uri: avatarsMap[message.avatarMapIndex]}}
                    />
                    <Text style={ss.Message__text}>{message.message}</Text>
                  </View>
                );
              })}
            </ScrollView>
            <View style={ss.inputContainer}>
              <TextInput style={ss.input} autoFocus />
              <Icon
                name="sc-telegram"
                type="evilicon"
                color="hsl(0, 0%, 24%)"
                size={2 * 0.64 * U}
                containerStyle={ss.send}
              />
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    </Suspense>
  );
};

export default React.memo(Chat);
