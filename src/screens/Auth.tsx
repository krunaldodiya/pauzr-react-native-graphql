import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';

const Auth = (props: any) => {
  const [authType, setAuthType] = useState('Sign In');

  return (
    <Fragment>
      <StatusBar backgroundColor="#0D62A2" barStyle="light-content" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#0D62A2'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              padding: 20,
            }}>
            <TouchableOpacity onPress={() => setAuthType('Sign In')}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: authType === 'Sign In' ? 'yellow' : 'white',
                }}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAuthType('Sign Up')}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: authType === 'Sign Up' ? 'yellow' : 'white',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            {authType === 'Sign In' ? (
              <SignIn {...props} />
            ) : (
              <SignUp {...props} />
            )}
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default React.memo(Auth);
