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
import {Button, Input} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';
import {GetAuthUser} from '../../generated/GetAuthUser';
import get_auth_user from '../../graphql/types/queries/get_auth_user';
import ss from './ProfileEditStyle';

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
              <Input placeholder="name" />
            </View>

            <Input placeholder="email" />

            <Input placeholder="phone" />

            <TouchableOpacity style={ss.dateOfBirth}>
              <DatePicker
                style={{
                  padding: 5,
                  width: '100%',
                  backgroundColor: 'white',
                }}
                date={authUser.me.dob}
                mode="date"
                placeholder={authUser.me.dob}
                format="DD-MM-YYYY"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    marginLeft: 0,
                  },
                }}
                onDateChange={(date: any) => {
                  console.log(date);
                }}
              />
            </TouchableOpacity>

            <Input placeholder="bio" multiline={true} />

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

            <Button title="save" containerStyle={{margin: 20}} />
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
