import {useMutation} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {
  REQUEST_OTP,
  SET_INITIAL_SCREEN,
  VERIFY_OTP,
} from '../../graphql/mutation';

const Otp = (props: any) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [serverOtp, setServerOtp] = useState('');

  const [setInitialScreen] = useMutation(SET_INITIAL_SCREEN);

  const [processRequestOtp, {loading: loadingRequestOtp}] = useMutation(
    REQUEST_OTP,
  );

  const [processVerifyOtp, {loading: loadingVerifyOtp}] = useMutation(
    VERIFY_OTP,
  );

  const setAuth = async ({user, token}: any, props: any) => {
    const initialScreen = user.language ? 'Home' : 'SelectLanguage';
    await setInitialScreen({variables: {initialScreen}});
    await AsyncStorage.setItem('token', token);
    props.navigation.replace(initialScreen);
  };

  const requestOtp = async () => {
    try {
      const {data} = await processRequestOtp({variables: {mobile}});
      setServerOtp(data.requestOtp);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    console.log('verifying', {mobile, otp: parseInt(otp)});

    try {
      const {data} = await processVerifyOtp({
        variables: {mobile, otp: parseInt(otp)},
      });
      await setAuth(data.verifyOtp, props);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#ffeebb',
        }}>
        <View style={{marginHorizontal: 20, marginBottom: 10}}>
          <View>
            <Input
              placeholder={serverOtp.length ? '4 Digit OTP' : 'Mobile Number'}
              leftIcon={{
                type: 'ionicons',
                name: serverOtp.length ? 'lock' : 'phone',
                size: 20,
              }}
              leftIconContainerStyle={{marginRight: 10}}
              value={serverOtp.length ? otp : mobile}
              onChangeText={value => {
                return serverOtp.length ? setOtp(value) : setMobile(value);
              }}
              errorStyle={{color: 'red'}}
              errorMessage=""
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={{margin: 20}}>
          <Button
            title={serverOtp.length ? 'verify otp' : 'request otp'}
            onPress={() => {
              return serverOtp.length ? verifyOtp() : requestOtp();
            }}
            titleStyle={{textTransform: 'uppercase'}}
            loading={loadingRequestOtp || loadingVerifyOtp}
            disabled={loadingRequestOtp || loadingVerifyOtp}
          />
        </View>
      </View>
    </Fragment>
  );
};

export default React.memo(Otp);
