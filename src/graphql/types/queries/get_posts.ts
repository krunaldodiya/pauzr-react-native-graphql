import gql from 'graphql-tag';
import POST_INFO_FRAGMENT from '../fragments/post_info';

export default gql`
  query GetPosts($page: Int!, $first: Int!) {
    posts(page: $page, first: $first) {
      paginatorInfo {
        count
        hasMorePages
      }
      data {
        ...PostInfo
      }
    }
  }

  ${POST_INFO_FRAGMENT}
`;
