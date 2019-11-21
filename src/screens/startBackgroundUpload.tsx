import {useQuery} from '@apollo/react-hooks';
import {useEffect} from 'react';
import {GetDrafts} from '../generated/GetDrafts';
import get_drafts from '../graphql/types/queries/get_drafts';
import screens from '../libs/screens';

export const startBackgroundUpload = async (data: any) => {
  if (data.initialScreen == screens.Home) {
    const {data} = useQuery<GetDrafts, {}>(get_drafts, {
      fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
      if (data) {
        console.log(data);
      }
    }, [data]);
  }
};
