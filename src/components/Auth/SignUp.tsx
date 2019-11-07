import {useMutation, useQuery} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import React, {Fragment} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import * as Yup from 'yup';
import {REGISTER} from '../../graphql/mutation';
import {GET_COUNTRY} from '../../graphql/query';
import screens from '../../libs/screens';

const SignUp = (props: any) => {
  const {data}: any = useQuery(GET_COUNTRY);
  const [processRegister] = useMutation(REGISTER);

  const setAuth = async ({user, token}: any, props: any) => {
    const initialScreen = user.language ? 'Home' : 'SelectLanguage';
    AsyncStorage.setItem('token', token);
    props.navigation.replace(initialScreen);
  };

  const doSignUp = async (values: any, bag: any) => {
    bag.setSubmitting(true);

    try {
      const {data} = await processRegister({
        variables: {
          name: values.name,
          email: values.email,
          password: values.password,
          mobile: values.mobile,
          country_id: values.country.id,
        },
      });

      bag.setSubmitting(false);
      await setAuth(data.register, props);
    } catch (error) {
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
          country: data.country,
        }}
        onSubmit={doSignUp}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(8, 'password should be minimum 8 digit')
            .required('password is required'),

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
                  placeholder="Full Name"
                  leftIcon={{
                    type: 'ionicons',
                    name: 'person',
                    size: 20,
                  }}
                  leftIconContainerStyle={{marginRight: 10}}
                  value={formikProps.values.name}
                  onChangeText={formikProps.handleChange('name')}
                  onBlur={formikProps.handleBlur('name')}
                  errorStyle={{color: 'red'}}
                  errorMessage={formikProps.errors.name}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View
              style={{
                marginHorizontal: 20,
                marginBottom: 10,
                flexDirection: 'row',
              }}>
              <View style={{flex: 4, justifyContent: 'center'}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#333',
                    padding: 12,
                    marginLeft: 10,
                  }}
                  onPress={() => {
                    props.navigation.push(screens.SelectCountry);
                  }}>
                  <Icon type="ionicons" name="phone" size={20} />
                  <Text
                    style={{fontSize: 17, marginLeft: 15, letterSpacing: 0.5}}>
                    +{data.country.phonecode}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{flex: 10, margin: 0, padding: 0}}>
                <Input
                  placeholder="9876543210"
                  value={formikProps.values.mobile}
                  onChangeText={formikProps.handleChange('mobile')}
                  onBlur={formikProps.handleBlur('mobile')}
                  errorStyle={{color: 'red'}}
                  errorMessage={formikProps.errors.mobile}
                  keyboardType="numeric"
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
            </View>

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
                title="register"
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

export default React.memo(SignUp);
