import {useMutation} from '@apollo/react-hooks';
import {SET_AUTH_USER} from '../graphql/mutation';

export const setAuth = ({user, token}: any, authUser: any, props: any) => {
  const [setAuthUser] = useMutation(SET_AUTH_USER);
  const initialScreen = user.language == null ? 'SelectLanguage' : 'Home';

  setAuthUser({
    variables: {
      authUser: {
        ...authUser.user,
        ...user,
        token: token,
        initialScreen,
      },
    },
  });

  props.navigation.replace(initialScreen);
};
