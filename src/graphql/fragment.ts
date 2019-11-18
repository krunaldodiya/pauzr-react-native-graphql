import gql from 'graphql-tag';

export const USER_INFO_FRAGMENT = gql`
  fragment UserInfo on User {
    id
    username
    name
    email
    mobile
    language
    avatar
    country {
      id
      name
      phonecode
      shortname
    }
    is_follower
    is_following
  }
`;
