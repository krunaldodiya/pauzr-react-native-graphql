import {useMutation} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import React, {Fragment} from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import * as Yup from 'yup';
import {LOGIN} from '../../graphql/mutation';

const SignIn = (props: any) => {
  const [processLogin] = useMutation(LOGIN);

  const setAuth = async ({user, token}: any, authUser: any) => {
    const initialScreen = user.language ? 'Home' : 'SelectLanguage';

    // await setAuthUser({
    //   variables: {
    //     authUser: {
    //       ...authUser.user,
    //       ...user,
    //       initialScreen,
    //     },
    //   },
    // });

    AsyncStorage.setItem('token', token);

    return {initialScreen};
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
      const {initialScreen} = await setAuth(data.login, null);
      props.navigation.replace(initialScreen);
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
    </Fragment>
  );
};

export default React.memo(SignIn);
