import {useQuery} from '@apollo/react-hooks';
import React, {Fragment} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {LoadCategories} from '../../generated/LoadCategories';
import load_categories from '../../graphql/types/queries/load_categories';
import screens from '../../libs/screens';
import {U} from '../../libs/vars';
import ss from './SearchStyle';

const Search = (props: any) => {
  const {data: categories, loading: loadingCategories} = useQuery<
    LoadCategories,
    {}
  >(load_categories, {
    fetchPolicy: 'cache-and-network',
  });

  if (!categories && loadingCategories) {
    return <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />;
  }

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={[ss.mainContainer, ss.mainContainer_clay]}>
          <TouchableOpacity
            style={ss.inputContainer}
            onPress={() => props.navigation.push(screens.SearchUsers)}>
            <Icon
              name="search"
              type="evilicon"
              color="hsl(0, 0%, 24%)"
              size={2 * 0.64 * U}
              containerStyle={ss.inputConteiner__icon}
            />
            <Text style={[ss.input, {textAlignVertical: 'center'}]}>
              Find People
            </Text>
          </TouchableOpacity>

          <View style={ss.categoriesContainer}>
            <Text style={ss.categoriesContainer__note}>
              or select the category:
            </Text>
            {categories.categories.map((category: any, index: number) => (
              <Category key={index} category={category} {...props} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

// todo ts interface instead of destructuring
const Category = ({category, navigation}) => {
  const {name, background_image, background_color} = category;

  return (
    <TouchableOpacity
      style={ss.Category}
      onPress={() => navigation.push(screens.SearchCategories, {category})}>
      <Image
        source={{uri: background_image}}
        style={[
          ss.Category__bg,
          !background_image && {backgroundColor: background_color},
        ]}
        resizeMethod="auto"
        resizeMode="cover"
      />
      <Text style={ss.Category__name}>{name.replace(/ /g, '\n')}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Search);
