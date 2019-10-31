import {useQuery} from '@apollo/react-hooks';
import {Formik} from 'formik';
import React, {Fragment} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import * as Yup from 'yup';
import {GET_AUTH_USER} from '../../graphql/query';
import screens from '../../libs/screens';

const SignUp = (props: any) => {
  const {data: authUser} = useQuery(GET_AUTH_USER);

  const doSignUpApi = async (values: any) => {
    //
  };

  const doSignUp = async (values: any, bag: any) => {
    bag.setSubmitting(true);

    try {
      await doSignUpApi(values);
      bag.setSubmitting(false);
    } catch (error) {
      if (error.response.status == 422) {
        Object.keys(error.response.data.errors).forEach(key => {
          bag.setErrors({[key]: error.response.data.errors[key][0]});
        });
      }

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
          country: authUser.auth.selectedCountry,
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
                    +{authUser.auth.selectedCountry.phonecode}
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