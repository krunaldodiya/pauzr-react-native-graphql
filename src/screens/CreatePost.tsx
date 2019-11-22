import {useMutation, useQuery} from '@apollo/react-hooks';
import moment from 'moment';
import React, {Fragment, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {
  Header,
  Icon,
  Image,
  Input,
  Overlay,
  Button,
} from 'react-native-elements';
import uuidv4 from 'uuid/v4';
import {
  CreatePost as CreatePostType,
  CreatePostVariables,
} from '../generated/CreatePost';
import {GetAuthUser} from '../generated/GetAuthUser';
import {LoadCategories} from '../generated/LoadCategories';
import create_post from '../graphql/types/mutations/create_post';
import get_auth_user from '../graphql/types/queries/get_auth_user';
import get_drafts from '../graphql/types/queries/get_drafts';
import load_categories from '../graphql/types/queries/load_categories';

const CreatePost = (props: any) => {
  const params = props.navigation.state.params;
  const uuid = uuidv4();

  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [overlay, setOverlay] = useState(false);

  const {data: authUser} = useQuery<GetAuthUser, {}>(get_auth_user);
  const {data: categories} = useQuery<LoadCategories, {}>(load_categories);
  const [createPostMutation, {loading: creatingPost}] = useMutation<
    CreatePostType,
    CreatePostVariables
  >(create_post);

  const keyExtractor = (item: any, index: number) => index.toString();

  const handleCreatePost = async () => {
    const getAttachments = params.files.map((attachment: any) => {
      return {...attachment, source: null, status: false, id: uuidv4()};
    });

    try {
      await createPostMutation({
        update: (store, {data}) => {
          const {drafts}: any = store.readQuery({query: get_drafts});
          const updatedCreatePost = [data && data.createPost, ...drafts];

          store.writeQuery({
            query: get_drafts,
            data: {drafts: updatedCreatePost},
          });

          props.navigation.pop();
        },
        variables: {
          id: uuid,
          category_id: category.id,
          description,
          type: 'Post',
          attachments: getAttachments,
        },
        optimisticResponse: {
          createPost: {
            __typename: 'Post',
            id: uuid,
            type: 'Post',
            description,
            attachments: getAttachments.map((attachment: any) => {
              return {...attachment, __typename: 'Attachment'};
            }),
            owner: {
              __typename: 'User',
              ...authUser?.me,
            },
            category,
            is_favorited: false,
            published: false,
            when: moment().fromNow(),
            created_at: moment(),
            updated_at: moment(),
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  const CreatePostButton = () => {
    return (
      <Button
        title="Create"
        buttonStyle={{backgroundColor: 'transparent'}}
        titleStyle={{
          color: 'white',
          textTransform: 'uppercase',
          fontSize: 14,
          marginRight: 5,
          fontWeight: '500',
        }}
        onPress={handleCreatePost}
        loading={creatingPost}
        loadingStyle={{marginRight: 20}}
      />
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
        rightComponent={category && <CreatePostButton />}
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
                  data={categories ? categories.categories : []}
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
