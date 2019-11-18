import {useQuery} from '@apollo/react-hooks';
import React, {Fragment} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {GET_CATEGORIES} from '../../graphql/query';
import screens from '../../libs/screens';
import {U} from '../../libs/vars';
import ss from './SearchStyle';

const Search = (props: any) => {
  const {data: categories, loading: loadingCategories} = useQuery(
    GET_CATEGORIES,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  if (!categories && loadingCategories) {
    return <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />;
  }

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={[ss.mainContainer, ss.mainContainer_clay]}>
          <TouchableOpacity
            style={ss.inputConteiner}
            onPress={() => props.navigation.push(screens.SearchResults)}>
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
              <Category key={index} {...category} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const _tempQuotient = name => {
  return (
    (4 / name.length) * ((name.match(/\n/g) && name.match(/\n/g).length) || 1)
  );
};

// todo ts interface instead of destructuring
const Category = ({name, background_image}) => (
  <View style={ss.Category}>
    <Image
      source={{uri: background_image}}
      style={ss.Category__bg}
      resizeMode="center"
    />
    {/* todo fit size */}
    <Text style={[ss.Category__name, {fontSize: U * _tempQuotient(name)}]}>
      {name}
    </Text>
  </View>
);

export default React.memo(Search);
