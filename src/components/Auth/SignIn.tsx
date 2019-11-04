import {useMutation, useQuery} from '@apollo/react-hooks';
import {Formik} from 'formik';
import React, {Fragment} from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import * as Yup from 'yup';
import {LOGIN, SET_AUTH_USER} from '../../graphql/mutation';
import {GET_AUTH_USER} from '../../graphql/query';

const SignIn = (props: any) => {
  const {data: authUser}: any = useQuery(GET_AUTH_USER);
  const [setAuthUser] = useMutation(SET_AUTH_USER);
  const [processLogin] = useMutation(LOGIN);

  const doSignIn = async (values: any, bag: any) => {
    bag.setSubmitting(true);

    try {
      const {data} = await processLogin({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      console.log('this is authUser', authUser);

      setAuthUser({
        variables: {
          authUser: {
            ...authUser.user,
            ...data.login.user,
            token: data.login.token,
            initialScreen:
              data.login.user.language == null ? 'SelectLanguage' : 'Home',
          },
        },
      });

      bag.setSubmitting(false);
    } catch (error) {
      console.log(error.graphQLErrors);

      // if (error.response.status == 422) {
      //   Object.keys(error.response.data.errors).forEach(key => {
      //     bag.setErrors({[key]: error.response.data.errors[key][0]});
      //   });
      // }

      bag.setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          mobile: '',
          country: authUser.user.country,
        }}
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
