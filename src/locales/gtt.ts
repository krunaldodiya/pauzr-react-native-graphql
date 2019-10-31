import {useQuery} from '@apollo/react-hooks';
import {GET_AUTH_USER} from '../graphql/query';

const languages = require('./languages.json');

const gtt = (text: string) => {
  const {data: authUser} = useQuery(GET_AUTH_USER);
  return languages[authUser.auth.selectedLanguage][text];
};

export default gtt;
