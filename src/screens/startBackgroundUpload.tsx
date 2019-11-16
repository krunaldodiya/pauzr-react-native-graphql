import {useQuery} from '@apollo/react-hooks';
import {useEffect} from 'react';
import {GET_DRAFTS} from '../graphql/query';
import screens from '../libs/screens';

export const startBackgroundUpload = async (data: any) => {
  if (data.initialScreen == screens.Home) {
    const {data} = useQuery(GET_DRAFTS, {
      fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
      if (data) {
        console.log(data);
      }
    }, [data]);
  }
};
