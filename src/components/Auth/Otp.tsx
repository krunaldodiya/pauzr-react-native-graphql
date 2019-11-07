import {useMutation} from '@apollo/react-hooks';
import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {REQUEST_OTP, VERIFY_OTP} from '../../graphql/mutation';
import AsyncStorage from '@react-native-community/async-storage';

const Otp = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('request_otp');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [processRequestOtp] = useMutation(REQUEST_OTP);
  const [processVerifyOtp] = useMutation(VERIFY_OTP);

  const setAuth = async ({user, token}: any, props: any) => {
    const initialScreen = user.language ? 'Home' : 'SelectLanguage';
    AsyncStorage.setItem('token', token);
    props.navigation.replace(initialScreen);
  };

  const requestOtp = async () => {
    setLoading(true);
    try {
      await processRequestOtp({variables: {mobile}});
      setType('verify_otp');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const {data} = await processVerifyOtp({variables: {mobile}});
      await setAuth(data.verifyOtp, props);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#ffffff'}}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#ffeebb',
        }}>
        <View style={{marginHorizontal: 20, marginBottom: 10}}>
          <View>
            <Input
              placeholder={
                type == 'request_otp' ? 'Mobile Number' : '4 Digit OTP'
              }
              leftIcon={{
                type: 'ionicons',
                name: type == 'request_otp' ? 'phone' : 'lock',
                size: 20,
              }}
              leftIconContainerStyle={{marginRight: 10}}
              value={type == 'request_otp' ? mobile : otp}
              onChangeText={value => {
                return type == 'request_otp' ? setMobile(value) : setOtp(value);
              }}
              errorStyle={{color: 'red'}}
              errorMessage=""
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={{margin: 20}}>
          <Button
            title={type == 'request_otp' ? 'request otp' : 'verify otp'}
            onPress={() => {
              return type == 'request_otp' ? requestOtp() : verifyOtp();
            }}
            titleStyle={{textTransform: 'uppercase'}}
          />
        </View>
      </View>
    </Fragment>
  );
};

export default React.memo(Otp);
