import React, {Fragment} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import screens from '../../libs/screens';
import {U} from '../../libs/vars';
import ss from './SearchStyle';

const categories = [
  {
    name: 'Travel',
    background: 'https://picsum.photos/id/27/500/500',
  },
  {name: 'Food', background: 'https://picsum.photos/id/26/500/500'},
  {
    name: 'Science\n&\nTechnology',
    background: 'https://picsum.photos/id/18/500/500',
  },
  {
    name: 'Travel',
    background: 'https://picsum.photos/id/54/500/500',
  },
  {
    name: 'Travel',
    background: 'https://picsum.photos/id/52/500/500',
  },
  {
    name: 'Travel',
    background: 'https://picsum.photos/id/62/500/500',
  },
  {
    name: 'Travel',
    background: 'https://picsum.photos/id/23/500/500',
  },
  {
    name: 'Travel',
    background: 'https://picsum.photos/id/65/500/500',
  },
  {
    name: 'Travel',
    background: 'https://picsum.photos/id/34/500/500',
  },
  {
    name: 'Travel',
    background: 'https://picsum.photos/id/2/500/500',
  },
  {
    name: 'Travel',
    background: 'https://picsum.photos/id/24/500/500',
  },
  {
    name: 'Travel',
    background: 'https://picsum.photos/id/7/500/500',
  },
];

const Search = (props: any) => {
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
            {categories.map((category, index) => (
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
const Category = ({name, background}) => (
  <View style={ss.Category}>
    <Image
      source={{uri: background}}
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
