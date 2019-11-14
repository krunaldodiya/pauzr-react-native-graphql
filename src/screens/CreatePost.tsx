import React, {Fragment, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Header, Icon, Image, Input, Overlay} from 'react-native-elements';

const CreatePost = (props: any) => {
  const params = props.navigation.state.params;
  const [description, setDescription] = useState();
  const [overlay, setOverlay] = useState(false);

  console.log(params);

  return (
    <Fragment>
      <Header
        statusBarProps={{
          backgroundColor: '#0D62A2',
          translucent: true,
        }}
        backgroundColor="#0D62A2"
        placement="center"
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => {
            props.navigation.pop();
          },
        }}
        centerComponent={{text: 'Create Post', style: {color: '#fff'}}}
        rightComponent={{
          text: 'Create',
          style: {color: 'white'},
          onPress: () => {
            console.log('test');
          },
        }}
      />

      <SafeAreaView style={{flex: 1}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{padding: 10}}>
              <Image
                source={{uri: params.files[0].thumbnail}}
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}
              />
            </View>

            <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
              <Text
                style={{fontSize: 16, textTransform: 'uppercase'}}
                onPress={() => setOverlay(true)}>
                Select a category
              </Text>
            </View>
          </View>

          <View style={{marginTop: 5}}>
            <Input
              placeholder="Description"
              leftIconContainerStyle={{marginRight: 10}}
              value={description}
              onChangeText={value => setDescription(value)}
              errorStyle={{color: 'red'}}
              autoCorrect={false}
              autoCapitalize="none"
              multiline={true}
            />
          </View>

          <Overlay isVisible={overlay} width={300}>
            <View style={{flex: 1}}>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                }}>
                <Icon
                  type="ionicons"
                  name="arrow-back"
                  size={18}
                  iconStyle={{marginRight: 20}}
                  onPress={() => setOverlay(false)}
                />
                <Text style={{textAlign: 'center', textTransform: 'uppercase'}}>
                  Request OTP
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text>hello</Text>
              </View>
            </View>
          </Overlay>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(CreatePost);
