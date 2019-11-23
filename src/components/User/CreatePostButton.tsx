import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import screens from '../../libs/screens';

const CreatePostButton = (props: any) => {
  return (
    <TouchableOpacity
      style={{
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        backgroundColor: 'white',
        height: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => props.navigation.push(screens.CreatePost)}>
      <Text
        style={{
          fontSize: 14,
          color: '#000',
        }}>
        Create Post
      </Text>
    </TouchableOpacity>
  );
};

export default CreatePostButton;
