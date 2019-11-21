import gql from 'graphql-tag';

export default gql`
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