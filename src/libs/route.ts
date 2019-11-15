import {createStackNavigator} from 'react-navigation-stack';
import Auth from '../screens/Auth';
import CreatePost from '../screens/CreatePost';
import Feeds from '../screens/fun/Feeds';
import Profile from '../screens/fun/Profile';
import Home from '../screens/Home';
import Picker from '../screens/Picker';
import SelectCountry from '../screens/SelectCountry';
import SelectLanguage from '../screens/SelectLanguage';

// temp:
import TotalLikes from '../components/Posts/TotalLikes';

const getStackNavigator = (initialRouteName: string) => {
  return createStackNavigator(
    {
      Auth: {screen: Auth},
      SelectLanguage: {screen: SelectLanguage},
      Home: {screen: Home},
      SelectCountry: {screen: SelectCountry},
      Profile: {screen: Profile},
      Picker: {screen: Picker},
      Feeds: {screen: Feeds},
      CreatePost: {screen: CreatePost},
      TotalLikes: {screen: TotalLikes},
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
