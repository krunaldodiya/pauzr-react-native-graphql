import gql from 'graphql-tag';
import USER_INFO_FRAGMENT from '../fragments/user_info';

export default gql`
  query GetUser($user_id: ID!) {
    user(user_id: $user_id) {
      ...UserInfo
    }
  }

  ${USER_INFO_FRAGMENT}
`;
