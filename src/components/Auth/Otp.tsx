import {useMutation, useQuery} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {GetConfig, GetConfigVariables} from '../../generated/GetConfig';
import {RequestOtp, RequestOtpVariables} from '../../generated/RequestOtp';
import {SetConfig, SetConfigVariables} from '../../generated/SetConfig';
import {VerifyOtp, VerifyOtpVariables} from '../../generated/VerifyOtp';
import request_otp from '../../graphql/types/mutations/request_otp';
import set_config from '../../graphql/types/mutations/set_config';
import verify_otp from '../../graphql/types/mutations/verify_otp';
import get_config from '../../graphql/types/queries/get_config';
import screens from '../../libs/screens';
import DeviceInfo from 'react-native-device-info';

const Otp = (props: any) => {
  const device_id = DeviceInfo.getUniqueId();

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [serverOtp, setServerOtp] = useState('');

  const [processRequestOtp, {loading: loadingRequestOtp}] = useMutation<
    RequestOtp,
    RequestOtpVariables
  >(request_otp);

  const [processVerifyOtp, {loading: loadingVerifyOtp}] = useMutation<
    VerifyOtp,
    VerifyOtpVariables
  >(verify_otp);

  const {data: config} = useQuery<GetConfig, GetConfigVariables>(get_config, {
    fetchPolicy: 'cache-and-network',
    variables: {
      device_id,
    },
  });

  const [setConfig] = useMutation<SetConfig, SetConfigVariables>(set_config);

  const setAuth = async ({user, token}: any, props: any) => {
    await AsyncStorage.setItem('token', token);

    const initialScreen = user.language ? screens.Home : screens.SelectLanguage;

    await setConfig({
      variables: {
        id: config?.getConfig?.id,
        initial_screen: initialScreen,
      },
    });

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
