import {useMutation} from '@apollo/react-hooks';
import {SET_AUTH_USER} from '../graphql/mutation';

export const useSetAuth = ({user, token}: any, authUser: any) => {
  const [setAuthUser] = useMutation(SET_AUTH_USER);
  const initialScreen = user.language == null ? 'SelectLanguage' : 'Home';

  setAuthUser({
    variables: {
      authUser: {
        ...authUser.user,
        ...user,
        token,
        initialScreen,
      },
    },
  });

  return {initialScreen};
};
