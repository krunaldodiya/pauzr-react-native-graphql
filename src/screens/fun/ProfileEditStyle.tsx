/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {StyleSheet} from 'react-native'
import {width, U, u} from '../../libs/vars'

export default StyleSheet.create({
  // todo generalize and move to common style file
  mainContainer: {
    backgroundColor: 'hsl(0,0%,94%)',

    flex: 1,
    flexDirection: 'column'
  },
  listBlock: {

  },

  input: {
    // backgroundColor: 'red',
    minWidth: 0,
    margin: u,
    marginHorizontal: U,
    
    // refactor
    marginVertical: 0,

    paddingVertical: u,
    paddingHorizontal: 0.75 * U,
  },
  inputStyle: {
    fontFamily: 'MPLUSRounded1c-Regular',
    fontSize: 0.75 * U,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },

  input__name: {
    // todo wrap
    // fontSize: U,
    fontSize: 0.9 * U,

    // marginHorizontal: 0, // todo for container too
  },
  input__bio: {
    fontSize: 0.5 * U,
  },

  button: {
    margin: U,

    borderRadius: U,
    backgroundColor: 'hsl(0, 0%, 88%)',

    padding: U,
  },
  button__title: {
    color: 'hsl(0,0%,24%)',
    fontFamily: 'MPLUSRounded1c-Regular',
    fontSize: U,
    lineHeight: 1.2 * U,
    // backgroundColor: 'red',
  },

  avaAndNameBlock: {
    margin: U,

    backgroundColor: 'white',
    borderRadius: U,
    padding: 0.5 * U,

    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 4 * U,
    height: 4 * U,
    borderRadius: 2.001 * U,
    overflow: 'hidden',
  },

  aboutContainer__nameAndBio: {
    // backgroundColor: 'red',
    margin: U,
    marginTop: 0,
  },
  name: {
    fontFamily: 'MPLUSRounded1c-Regular', // todo replace with theme.fonts
    fontSize: U,
    marginBottom: u,
  },
  bio: {
    fontFamily: 'MPLUSRounded1c-Regular', // todo replace with theme.fonts
    fontSize: 0.5 * U,
  },

  dateOfBirth: {
    margin: U,
    marginVertical: u,
    width: 10 * U,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'hsl(0,0%,98%)',
    // backgroundColor: 'white',
    borderRadius: 0.5 * U,

    // paddingLeft: U,
    paddingLeft: 0.75 * U,
  },
  dateOfBirth__text: {
    width: 4 * U,
    fontFamily: 'MPLUSRounded1c-Regular',
  },
  // dateOfBirth__text_value: {
  //   fontFamily: 'MPLUSRounded1c-Bold' // todo for datepicker now
  // },

  datePicker: {
    // alignSelf: 'stretch',
    // width: 14 * U, // refactor
    // width: 6 * U,

    borderWidth: 0,
    padding: u,

    backgroundColor: 'white',
    borderRadius: 0.5 * U,
  },

  interestsContainer: {
    // backgroundColor: 'red',
    margin: U,
    // refactor
    marginVertical: u,

    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Interest: {
    margin: u,
    marginBottom: 0,
    
    paddingHorizontal: 1.5 * u,
    paddingVertical: 0.5 * u,
    backgroundColor: 'hsl(0,0%, 86%)',
    borderRadius: 100,
  },
  Interest__title: {},

  button_bottom: {
    // position: 'absolute',
    // bottom: U,
    // though, no
    // marginTop: 3 * U,
  },

})
