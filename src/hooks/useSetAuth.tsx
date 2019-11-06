import {useMutation} from '@apollo/react-hooks';
import {SET_AUTH_USER} from '../graphql/mutation';

export const useSetAuth = async ({user, token}: any, authUser: any) => {
  const [setAuthUser] = useMutation(SET_AUTH_USER);
  console.log('test');

  const initialScreen = user.language == null ? 'SelectLanguage' : 'Home';

  await setAuthUser({
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
