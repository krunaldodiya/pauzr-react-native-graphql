import {createStackNavigator} from 'react-navigation-stack';
import Auth from '../screens/Auth';
import Profile from '../screens/fun/Profile';
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
