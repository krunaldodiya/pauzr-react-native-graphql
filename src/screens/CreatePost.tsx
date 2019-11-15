import {useMutation, useQuery} from '@apollo/react-hooks';
import React, {Fragment, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {Header, Icon, Image, Input, Overlay} from 'react-native-elements';
import {CREATE_POST} from '../graphql/mutation';
import {GET_CATEGORIES} from '../graphql/query';
const uuidv4 = require('uuid/v4');

const CreatePost = (props: any) => {
  const params = props.navigation.state.params;

  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [overlay, setOverlay] = useState(false);

  const {data, loading} = useQuery(GET_CATEGORIES);
  const [createPostMutation] = useMutation(CREATE_POST);

  const keyExtractor = (item: any, index: number) => index.toString();

  const renderItem = (data: any) => {
    const {item} = data;

    return (
      <View style={{flex: 1}}>
        <Text
          style={{fontSize: 18, padding: 5}}
          onPress={() => {
            setCategory(item);
            setOverlay(false);
          }}>
          {item.name}
        </Text>
      </View>
    );
  };

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
          onPress: async () => {
            try {
              const data = await createPostMutation({
                variables: {
                  id: uuidv4(),
                  category_id: category.id,
                  description,
                  type: 'Post',
                  attachments: params.files,
                },
              });

              console.log(data);
            } catch (error) {
              console.log(error);
            }
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
                {category ? category.name : 'Select a Category'}
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

          <Overlay isVisible={overlay} width={300} overlayStyle={{padding: 0}}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#eee',
                  padding: 10,
                }}>
                <Icon
                  type="ionicons"
                  name="arrow-back"
                  size={24}
                  iconStyle={{marginRight: 10}}
                  onPress={() => setOverlay(false)}
                />

                <Text
                  style={{
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: 14,
                    textAlignVertical: 'center',
                  }}>
                  Select a category
                </Text>
              </View>

              <View style={{flex: 1, padding: 10}}>
                <FlatList
                  data={loading ? [] : data.categories}
                  keyExtractor={keyExtractor}
                  renderItem={renderItem}
                />
              </View>
            </View>
          </Overlay>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(CreatePost);
