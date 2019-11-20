import {useQuery} from '@apollo/react-hooks';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button, Icon, Input, Overlay} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {FlatList, NavigationScreenProp} from 'react-navigation';
import FeedList from '../../components/Posts/FeedList';
import {GET_AUTH_USER} from '../../graphql/query';
import getAssets from '../../libs/image';
import {u, U} from '../../libs/vars';
import ss from './ProfileEditStyle';
import DatePicker from 'react-native-datepicker';

interface ProfileEditProps {
  navigation: NavigationScreenProp<any, any>;
}

const ProfileEdit = (props: ProfileEditProps) => {
  const [tab, setTab] = useState(0);
  const {data: authUser} = useQuery(GET_AUTH_USER);

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
              <Input containerStyle={[ss.input, {marginHorizontal: 0}]} value='Pavel Shamparov' inputStyle={[ss.inputStyle, ss.input__name]} inputContainerStyle={ss.inputContainerStyle} placeholder="name" />
            </View>

            <Input containerStyle={ss.input} inputStyle={ss.inputStyle} inputContainerStyle={ss.inputContainerStyle} placeholder="email" />

            <Input containerStyle={ss.input} inputStyle={ss.inputStyle} inputContainerStyle={ss.inputContainerStyle} placeholder="phone" />

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
