import {useMutation} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import React, {Fragment, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Button, Icon, Input, Overlay, Text} from 'react-native-elements';
import * as Yup from 'yup';
import {LOGIN} from '../../graphql/mutation';
import Otp from './Otp';

const SignIn = (props: any) => {
  const [overlay, setOverlay] = useState(false);
  const [processLogin] = useMutation(LOGIN);

  const setAuth = async ({user, token}: any, props: any) => {
    const initialScreen = user.language ? 'Home' : 'SelectLanguage';
    AsyncStorage.setItem('token', token);
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
      await setAuth(data.login, props);
    } catch (error) {
      bag.setSubmitting(false);
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
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
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

      <Overlay isVisible={overlay} height={350} width={350}>
        <View style={{flex: 1}}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
            }}>
            <Icon
              type="ionicons"
              name="arrow-back"
              size={18}
              iconStyle={{marginRight: 20}}
              onPress={() => setOverlay(false)}
            />
            <Text style={{textAlign: 'center', textTransform: 'uppercase'}}>
              Request OTP
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
