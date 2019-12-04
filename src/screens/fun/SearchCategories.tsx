import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, Suspense} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {
  GetPostsByCategory,
  GetPostsByCategoryVariables,
} from 'src/generated/GetPostsByCategory';
import get_posts_by_category from '../../graphql/types/queries/get_posts_by_category';
import MasonryList from 'react-native-masonry-list';
import {Header} from 'react-native-elements';

const SearchCategories = (props: any) => {
  const {category} = props.navigation.state.params;

  const {data: posts, error} = useQuery<
    GetPostsByCategory,
    GetPostsByCategoryVariables
  >(get_posts_by_category, {
    fetchPolicy: 'cache-and-network',
    variables: {
      category_id: category.id,
      first: 100,
    },
  });

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
            <Text style={{color: 'white', fontSize: 18}}>{category.name}</Text>
          }
        />

        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <MasonryList
              backgroundColor="#ccc"
              columns={3}
              spacing={2}
              images={posts?.getPostsByCategory?.data.map(post => {
                const attachment = post.attachments[0];

                return {
                  uri: attachment.path,
                  dimensions: {
                    width: attachment.width,
                    height: attachment.height,
                  },
                };
              })}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    </Suspense>
  );
};

export default SearchCategories;
