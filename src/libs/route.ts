import {createStackNavigator} from 'react-navigation-stack';
import Auth from '../screens/Auth';
import Home from '../screens/Home';
import SelectCountry from '../screens/SelectCountry';
import SelectLanguage from '../screens/SelectLanguage';
import Groups from '../screens/focus/Groups';
import Scoreboard from '../screens/focus/Scoreboard';
import Timer from '../screens/focus/Timer';

const getStackNavigator = (initialRouteName: string) => {
  return createStackNavigator(
    {
      Auth: {screen: Auth},
      SelectLanguage: {screen: SelectLanguage},
      Home: {screen: Home},
      SelectCountry: {screen: SelectCountry},
      Groups: {screen: Groups},
      Scoreboard: {screen: Scoreboard},
      Timer: {screen: Timer},
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
