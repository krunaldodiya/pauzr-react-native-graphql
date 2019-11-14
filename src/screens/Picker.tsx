import {useMutation} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import React, {Fragment, useReducer, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, View} from 'react-native';
import Upload from 'react-native-background-upload';
import {Button, Text} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {CREATE_POST} from '../graphql/mutation';
import {pickerSettings} from '../libs/vars';

const draftInitialState = {
  id: null,
  description: null,
  tag_id: null,
  user_id: null,
  published: false,
  files: [],
};

const draftReducer = (state: any, action: any) => {
  if (action.type === 'SET_DRAFT') {
    return {...state, ...action.payload};
  }

  return state;
};

const Picker = () => {
  const [items, dispatch] = useReducer(draftReducer, draftInitialState);

  const [queues, setQueues] = useState({});

  const [createPostMutation] = useMutation(CREATE_POST);

  const uploadFiles = async (files: any[]) => {
    files.forEach(async file => {
      const path = file.path.replace('file://', '');
      const token = await AsyncStorage.getItem('token');
      const options = {
        url: 'https://pauzr.tk/api/medias/upload',
        path,
        method: 'POST',
        field: 'file',
        type: 'multipart',
        headers: {
          'content-type': 'application/octet-stream',
          Authorization: `Bearer ${token}`,
        },
      };

      Upload.startUpload(options)
        .then((uploadId: string) => {
          Upload.addListener('progress', uploadId, (data: any) => {
            setQueues({
              [uploadId]: {
                ...file,
                uploadId,
                progress: data.progress,
              },
            });
          });
        })
        .catch((e: any) => console.log(e));
    });
  };

  const createPost = async () => {
    const data = await createPostMutation({
      variables: {
        title: 'Testing Post',
        category: 'Science & Technology',
        type: 'Post',
      },
    });

    console.log(data);
  };

  const capturePhoto = () => {
    ImagePicker.openCamera(pickerSettings.capturePhoto)
      .then((image: any) => {
        uploadFiles([image]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const recordVideo = () => {
    ImagePicker.openCamera(pickerSettings.recordVideo)
      .then((image: any) => {
        uploadFiles([image]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const galleryFiles = () => {
    ImagePicker.openPicker(pickerSettings.galleryFiles)
      .then((image: any) => {
        uploadFiles(image);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const keyExtractor = (item: any, index: number) => index.toString();

  return (
    <Fragment>
      <StatusBar backgroundColor="#0D62A2" barStyle="light-content" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, margin: 5}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Button
              containerStyle={{margin: 1, flex: 1}}
              onPress={capturePhoto}
              title="Photo"
            />
            <Button
              containerStyle={{margin: 1, flex: 1}}
              onPress={recordVideo}
              title="Video"
            />
            <Button
              containerStyle={{margin: 1, flex: 1}}
              onPress={galleryFiles}
              title="Gallery"
            />
          </View>

          <View>
            <FlatList
              keyExtractor={keyExtractor}
              data={Object.values(queues)}
              renderItem={(data: any) => {
                return (
                  <View>
                    <Text>{data.item.uploadId}</Text>
                    <Text>{data.item.size / 1000} KBs</Text>
                    <Text>{data.item.progress}</Text>
                  </View>
                );
              }}
            />
          </View>

          <View>
            <Button
              containerStyle={{margin: 5}}
              onPress={createPost}
              title="Create Post"
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Picker);
