import gql from 'graphql-tag';

export default gql`
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
