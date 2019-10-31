import {createStackNavigator} from 'react-navigation-stack';
import Auth from '../screens/Auth';
import Language from '../screens/Language';
import Home from '../screens/Home';
import SelectCountry from '../screens/SelectCountry';

const getStackNavigator = (initialRouteName: string) => {
  return createStackNavigator(
    {
      Auth: {screen: Auth},
      Language: {screen: Language},
      Home: {screen: Home},
      SelectCountry: {screen: SelectCountry},
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
