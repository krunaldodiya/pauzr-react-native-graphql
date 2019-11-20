import gql from 'graphql-tag';

export const POST_INFO_FRAGMENT = gql`
  fragment PostInfo on Post {
    id
    description
    type
    attachments {
      id
      path
      mime
      source
      thumbnail
      size
      height
      width
      status
    }
    owner {
      id
      name
      avatar
    }
    category {
      id
      name
    }
    when
    is_favorited
    created_at
    updated_at
  }
`;

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
