import {useMutation, useQuery} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import React, {Fragment, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Input, Overlay, Text} from 'react-native-elements';
import * as Yup from 'yup';
import {GetConfig, GetConfigVariables} from '../../generated/GetConfig';
import {SetConfig, SetConfigVariables} from '../../generated/SetConfig';
import set_config from '../../graphql/types/mutations/set_config';
import get_config from '../../graphql/types/queries/get_config';
import {Login, LoginVariables} from '../../generated/Login';
import login from '../../graphql/types/mutations/login';
import screens from '../../libs/screens';
import Otp from './Otp';
import DeviceInfo from 'react-native-device-info';

const SignIn = (props: any) => {
  const device_id = DeviceInfo.getUniqueId();

  const [overlay, setOverlay] = useState(false);
  const [secure, setSecure] = useState(true);

  const {data: config} = useQuery<GetConfig, GetConfigVariables>(get_config, {
    fetchPolicy: 'cache-and-network',
    variables: {
      device_id,
    },
  });

  const [processLogin] = useMutation<Login, LoginVariables>(login, {
    errorPolicy: 'all',
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

  const doSignIn = async (values: any, bag: any) => {
    bag.setSubmitting(true);

    try {
      const {data} = await processLogin({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      bag.setSubmitting(false);
      await setAuth(data?.login, props);
    } catch (error) {
      console.log(error);

      const response = error.networkError || error.graphQLErrors;
      const message = response[0].extensions.reason;

      bag.setSubmitting(false);

      Alert.alert('Oops', message);
    }
  };

  return (
    <Fragment>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={doSignIn}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('invalid email')
            .required('email is required'),

          password: Yup.string()
            .min(4, 'password should be minimum 4 digit')
            .required('password is required'),
        })}>
        {formikProps => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#ffeebb',
            }}>
            <View style={{marginHorizontal: 20, marginBottom: 10}}>
              <View>
                <Input
                  placeholder="Email Address"
                  leftIcon={{
                    type: 'ionicons',
                    name: 'email',
                    size: 20,
                  }}
                  leftIconContainerStyle={{marginRight: 10}}
                  value={formikProps.values.email}
                  onChangeText={formikProps.handleChange('email')}
                  onBlur={formikProps.handleBlur('email')}
                  errorStyle={{color: 'red'}}
                  errorMessage={formikProps.errors.email}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={{marginHorizontal: 20, marginBottom: 10}}>
              <View>
                <Input
                  placeholder="Password"
                  leftIcon={{
                    type: 'ionicons',
                    name: 'lock',
                    size: 20,
                  }}
                  leftIconContainerStyle={{marginRight: 10}}
                  value={formikProps.values.password}
                  onChangeText={formikProps.handleChange('password')}
                  onBlur={formikProps.handleBlur('password')}
                  errorStyle={{color: 'red'}}
                  errorMessage={formikProps.errors.password}
                  secureTextEntry={secure}
                  autoCorrect={false}
                  autoCapitalize="none"
                  rightIcon={{
                    type: 'Ionicons',
                    name: 'lock',
                    size: 20,
                    onPress: () => {
                      setSecure(!secure);
                    },
                  }}
                />
              </View>
            </View>

            <View style={{margin: 20}}>
              <Button
                title="login"
                onPress={formikProps.handleSubmit}
                titleStyle={{textTransform: 'uppercase'}}
                loading={formikProps.isSubmitting}
                disabled={!formikProps.isValid || formikProps.isSubmitting}
              />
            </View>
          </View>
        )}
      </Formik>

      <Overlay isVisible={overlay} width={350} overlayStyle={{padding: 0}}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#eee',
              padding: 10,
            }}>
            <Icon
              type="ionicons"
              name="arrow-back"
              size={24}
              iconStyle={{marginRight: 10}}
              onPress={() => setOverlay(false)}
            />

            <Text
              style={{
                textAlign: 'center',
                textTransform: 'uppercase',
                fontSize: 14,
                textAlignVertical: 'center',
              }}>
              Request Otp
            </Text>
          </View>

          <View style={{flex: 1}}>
            <Otp {...props} />
          </View>
        </View>
      </Overlay>

      <TouchableOpacity style={{padding: 15}} onPress={() => setOverlay(true)}>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
          Login with Otp
        </Text>
      </TouchableOpacity>
    </Fragment>
  );
};

export default React.memo(SignIn);
