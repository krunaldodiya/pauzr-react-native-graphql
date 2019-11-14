import React, {Fragment, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Header, Input, Image} from 'react-native-elements';

const CreatePost = (props: any) => {
  const params = props.navigation.state.params;
  const [description, setDescription] = useState();

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

            <View style={{flex: 1, padding: 10}}>
              <Text style={{fontSize: 18}}>Select a category</Text>
            </View>
          </View>
          <View>
            <Input
              placeholder="Description"
              leftIcon={{
                type: 'ionicons',
                name: 'note',
                size: 20,
              }}
              leftIconContainerStyle={{marginRight: 10}}
              value={description}
              onChangeText={value => setDescription(value)}
              errorStyle={{color: 'red'}}
              autoCorrect={false}
              autoCapitalize="none"
              multiline
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(CreatePost);
