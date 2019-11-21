import gql from 'graphql-tag';
import POST_INFO_FRAGMENT from '../fragments/post_info';

export default gql`
  mutation CreatePost(
    $id: ID!
    $category_id: ID!
    $type: String!
    $description: String
    $attachments: [AttachmentInput!]!
  ) {
    createPost(
      id: $id
      category_id: $category_id
      type: $type
      description: $description
      attachments: $attachments
    ) {
      ...PostInfo
    }
  }

  ${POST_INFO_FRAGMENT}
`;
