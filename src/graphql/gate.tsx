import AsyncStorage from '@react-native-community/async-storage';
import {NormalizedCacheObject} from 'apollo-boost';
import {persistCache} from 'apollo-cache-persist';
import {PersistedData, PersistentStorage} from 'apollo-cache-persist/types';
import {useEffect, useState} from 'react';

export const PersistGate = (props: any) => {
  const {client, children, loading = null, failed = null} = props;

  const [status, setStatus] = useState('loading');

  useEffect(() => {
    persistCache({
      cache: client.cache,
      storage: AsyncStorage as PersistentStorage<
        PersistedData<NormalizedCacheObject>
      >,
      maxSize: false,
      debug: true,
      debounce: 0,
      trigger: 'write',
    })
      .then(() => setStatus('success'))
      .catch(() => setStatus('failed'));
  }, []);

  return status == 'success' ? children : status == 'failed' ? failed : loading;
};
