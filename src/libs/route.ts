import {createStackNavigator} from 'react-navigation-stack';
import Auth from '../screens/Auth';
import CreatePost from '../screens/CreatePost';
// import Chat from '../screens/fun/chat/Chat';
import Chat from '../screens/fun/chat/ChatBackup'; // temp
import Feeds from '../screens/fun/Feeds';
import TotalLikes from '../screens/fun/post/TotalLikes';
import Profile from '../screens/fun/Profile';
import ProfileEdit from '../screens/fun/ProfileEdit';
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
      ProfileEdit: {screen: ProfileEdit},
      Feeds: {screen: Feeds},
      CreatePost: {screen: CreatePost},
      TotalLikes: {screen: TotalLikes},
      SearchResults: {screen: SearchResults},
      Chat: {screen: Chat},
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
