/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {StyleSheet} from 'react-native'
import {width, U, u} from '../../libs/vars'

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: 'hsl(0,0%,94%)',

    flex: 1,
    flexDirection: 'column'
  },

  messagesContainer: {
    flex: 1,
  },
  Message: {},
  Message_fromMe: {},
  Message__text: {},
  Message__avatar: {},

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',

    height: 2 * U,
    
    // borderTopWidth: 0.5,
    borderWidth: 0.5,
      margin: -1,
    borderColor: 'hsl(0,0%,64%)',
    borderTopLeftRadius: U,
    borderTopRightRadius: U,
    // overflow: "hidden",
    paddingHorizontal: 0.25 * U,
  },
  input: {
    flex: 1,

    // paddingVertical: u,
    paddingHorizontal: 0.75 * U,
    
    fontFamily: 'MPLUSRounded1c-Regular',
  },
  send: {
    // backgroundColor:'red',
    height: 2 * U,
    width: 2 * U,
    paddingTop: 3 * 0.64 * u,
  },
  inputStyle: {
    fontSize: 0.75 * U,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },

})
