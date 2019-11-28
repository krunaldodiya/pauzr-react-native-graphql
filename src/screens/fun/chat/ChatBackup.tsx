import React, {Fragment} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import {NavigationScreenProp, ScrollView} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {width, U, u} from '../../../libs/vars';

import ss from './ChatStyle';

interface ChatProps {
  navigation: NavigationScreenProp<any, any>;
}

const avatarsMap = [
  'https://picsum.photos/id/63/500/500',
  'https://picsum.photos/id/64/500/500',
];

const messagesPipe = [
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
  {dateSeparator: 'today'},
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

// todo extract to external component
const DateSeparator = ({date}) => (
  <View style={ss.DateSeparator}>
    <Text style={ss.DateSeparator__text}>{date}</Text>
  </View>
);

const Chat = (props: ChatProps) => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={ss.mainContainer}>
          <View style={ss.header}>
            <Image
              style={ss.header__avatar}
              source={{uri: 'https://picsum.photos/id/63/500/500'}}
            />
            <Text style={ss.header__name}>Akella Balisky</Text>
          </View>

          <ScrollView contentContainerStyle={ss.messagesContainer}>
            {messagesPipe.map((message, index) =>
              message.dateSeparator ? ( // todo add logic
                <DateSeparator date={message.dateSeparator} />
              ) : (
                <View
                  key={message.message + message.time} // todo extract to component
                  style={[ss.Message, message.fromMe && ss.Message_fromMe]}>
                  <Image
                    style={ss.Message__avatar}
                    source={{uri: avatarsMap[message.avatarMapIndex]}}
                  />
                  <Text style={ss.Message__text}>{message.message}</Text>

                  {index === messagesPipe.length - 1 && (
                    // todo you can also bind with other status
                    <Icon
                      name="check" // can bind, for example, this
                      type="evilicon"
                      color="hsl(0, 0%, 24%)" // and this
                      // color="hsl(207, 80%, 64%)" // |
                      size={U}
                      containerStyle={[
                        ss.messageStatus,
                        message.fromMe && ss.messageStatus_fromMe,
                      ]}
                    />
                  )}
                  {'if(showTime)' && (
                    <Text style={ss.message__time}>18:53</Text>
                  )}
                </View>
              ),
            )}
          </ScrollView>
          <View style={ss.inputContainer}>
            <Icon
              name="camera"
              type="evilicon"
              color="hsl(0, 0%, 24%)"
              size={2 * 0.64 * U}
              containerStyle={ss.send}
            />
            <TextInput style={ss.input} autoFocus returnKeyType="send" />
            <Icon
              name="image"
              type="evilicon"
              color="hsl(0, 0%, 24%)"
              size={2 * 0.64 * U}
              containerStyle={ss.send}
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Chat);
