import NetInfo from '@react-native-community/netinfo';
import {ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost';
import {setContext} from 'apollo-link-context';
import {ApolloOfflineClient} from 'offix-client';
import {AsyncStorage} from 'react-native';
import {httpUrlProd} from '../libs/vars';
import {pusherLink} from './pusher';

const networkStatus = {
  onStatusChangeListener(callback: any) {
    const listener = (connected: boolean) => {
      callback.onStatusChange({online: connected});
    };
    NetInfo.isConnected.addEventListener('connectionChange', listener);
  },
  isOffline() {
    return NetInfo.isConnected.fetch().then(connected => !connected);
  },
};

const authLink = setContext(async (req, {headers}) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: httpUrlProd,
});

const link = ApolloLink.from([authLink, pusherLink, httpLink]);

const config = {
  link,
  cache: new InMemoryCache(),
  offlineStorage: AsyncStorage,
  cacheStorage: AsyncStorage,
  networkStatus,
  retryOptions: {
    attempts: {max: Infinity},
  },
};

export default new ApolloOfflineClient(config);
