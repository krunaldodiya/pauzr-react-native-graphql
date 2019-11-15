import {createStackNavigator} from 'react-navigation-stack';
import Auth from '../screens/Auth';
import Profile from '../screens/fun/Profile';
import Home from '../screens/Home';
import SelectCountry from '../screens/SelectCountry';
import SelectLanguage from '../screens/SelectLanguage';
import Feeds from '../screens/fun/Feeds';

// temp:
import TotalLikes from '../components/Posts/TotalLikes'

const getStackNavigator = (initialRouteName: string) => {
  return createStackNavigator(
    {
      Auth: {screen: Auth},
      SelectLanguage: {screen: SelectLanguage},
      Home: {screen: Home},
      SelectCountry: {screen: SelectCountry},
      Profile: {screen: Profile},
      Feeds: {screen: Feeds},

      // temp ; or should we declare it as modal?
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
