import {useQuery} from '@apollo/react-hooks';
import get_auth_user from '../graphql/types/queries/get_auth_user';

const languages = require('./languages.json');

const gtt = (text: string) => {
  const {data: authUser} = useQuery(get_auth_user);
  return languages[authUser.auth.selectedLanguage][text];
};

export default gtt;
