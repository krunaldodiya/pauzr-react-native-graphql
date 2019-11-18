import {createStackNavigator} from 'react-navigation-stack';
import Auth from '../screens/Auth';
import CreatePost from '../screens/CreatePost';
import Feeds from '../screens/fun/Feeds';
import TotalLikes from '../screens/fun/post/TotalLikes';
import Profile from '../screens/fun/Profile';
import SearchResults from '../screens/fun/SearchResults';
import Home from '../screens/Home';
import SelectCountry from '../screens/SelectCountry';
import SelectLanguage from '../screens/SelectLanguage';

const getStackNavigator = (initialRouteName: string) => {
  return createStackNavigator(
    {
      Auth: {screen: Auth},
      SelectLanguage: {screen: SelectLanguage},
      Home: {screen: Home},
      SelectCountry: {screen: SelectCountry},
      Profile: {screen: Profile},
      Feeds: {screen: Feeds},
      CreatePost: {screen: CreatePost},
      TotalLikes: {screen: TotalLikes},
      SearchResults: {screen: SearchResults},
    },
    {
      initialRouteName,
      defaultNavigationOptions: {
        header: null,
      },
    },
  );
};

export default getStackNavigator;
