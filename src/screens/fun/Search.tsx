import React, {Fragment, useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import screens from '../../libs/screens';
import React, {Fragment} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';
import {U, u} from '../../libs/vars';

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
  const [keywords, setKeywords] = useState();

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={[ss.mainContainer, ss.mainContainer_clay]}>
          <View style={ss.inputConteiner}>
            <Icon
              name="search"
              type="evilicon"
              color="hsl(0, 0%, 24%)"
              size={2 * 0.64 * U}
              containerStyle={ss.inputConteiner__icon}
            />
            <TextInput
              placeholder="find people"
              style={ss.input}
              value={keywords}
              onChangeText={value => setKeywords(value)}
            />

            <Button
              title="Search"
              onPress={() => {
                props.navigation.push(screens.SearchResults, {keywords});
              }}
            />
          </View>

          <View style={ss.categoriesContainer}>
            <Text style={ss.categoriesContainer__note}>
              or select the category:
            </Text>
            {categories.map(category => (
              <Category {...category} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const _tempQuotient = name =>
  (4 / name.length) * ((name.match(/\n/g) && name.match(/\n/g).length) || 1);

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
