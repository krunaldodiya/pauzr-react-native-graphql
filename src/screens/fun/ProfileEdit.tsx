import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Button, Input, Icon} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';
import {GetAuthUser} from '../../generated/GetAuthUser';
import get_auth_user from '../../graphql/types/queries/get_auth_user';
import ss, {colors} from './ProfileEditStyle';
import {width, U, u} from '../../libs/vars'

interface ProfileEditProps {
  navigation: NavigationScreenProp<any, any>;
}

const ProfileEdit = (props: ProfileEditProps) => {
  const [tab, setTab] = useState(0);
  const {data: authUser} = useQuery<GetAuthUser, {}>(get_auth_user);

  // todo validation
  // todo dynamic date of birth

  /*
    Photo( changeable), 
    Name(changeable), 
    email ( not changeable, just display), 
    phone ( not changeable ,just display), 
    DOB,
    Gender ( use flat icons) , 
    Bio( 150 characters), 
    Interests ( same as categories but in chips, user can selectdeselect)), 
    Save button
  */

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#0D62A2" />

      <SafeAreaView style={{flex: 1}}>
        <View style={ss.mainContainer}>
          <View style={ss.listBlock}>
            <View style={ss.avaAndNameBlock}>
              <TouchableOpacity>
                <Image
                  style={ss.avatar}
                  source={{uri: 'https://picsum.photos/id/63/500/500'}}
                />
              </TouchableOpacity>
              <Input containerStyle={[ss.input, {marginHorizontal: 0}]} value='Pavel Shamparov' inputStyle={[ss.inputStyle, ss.input__name]} inputContainerStyle={[ss.inputContainerStyle, {backgroundColor: 'transparent'}]} placeholder="name" />
            </View>

            <Input 
              containerStyle={ss.input} 
              inputStyle={ss.inputStyle} 
              inputContainerStyle={ss.inputContainerStyle} 
              placeholder="email"  // value='duhram@gmail.com'
              editable={false}
              leftIcon={
                <Icon
                  name='email'
                  size={U}
                  color={colors.input__text}
                  containerStyle={ss.input__icon}
                />
              }
            />

            <Input 
              containerStyle={ss.input} 
              inputStyle={ss.inputStyle}
              inputContainerStyle={ss.inputContainerStyle} 
              placeholder="phone" 
              editable={false}  // value='+43 982-456-1248'
              leftIcon={
                <Icon
                  name='phone'
                  size={U}
                  color={colors.input__text}
                  containerStyle={ss.input__icon}
                />
              }
            />

            <TouchableOpacity style={ss.dateOfBirth}>
              <Text style={ss.dateOfBirth__text}>saw the light: </Text>
              <DatePicker
                style={ss.datePicker}
                date={authUser.me.dob}
                mode="date"
                placeholder={authUser.me.dob}
                format="DD-MM-YYYY"
                customStyles={{
                  // dateIcon: {
                    // position: 'absolute',
                    // left: 0,
                    // top: 0,
                    // marginLeft: 0,
                  // },
                  dateInput: {borderWidth: 0, /*borderLeftWidth: 0.5*/}
                }}
                onDateChange={(date: any) => {
                  console.log(date);
                }}
              />
            </TouchableOpacity>

            <Input containerStyle={ss.input} inputStyle={[ss.inputStyle, ss.input__bio]} inputContainerStyle={ss.inputContainerStyle} placeholder="bio" multiline={true} />

            <Text style={ss.heading}> Interests </Text>
            <View style={ss.interestsContainer}>
              <Interest title="South Park" />
              <Interest title="Gym" />
              <Interest title="React" />
              <Interest title="learning" />
              <Interest title="beach" />
              <Interest title="books" />
              <Interest title="fitness" />
              <Interest title="eat" />
            </View>

            <Button title="save" buttonStyle={[ss.button, ss.button_bottom]} titleStyle={ss.button__title} />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const Interest = ({title}) => (
  <TouchableOpacity style={ss.Interest}>
    <Text style={ss.Interest__title}>{title}</Text>
  </TouchableOpacity>
);

export default React.memo(ProfileEdit);
