/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {StyleSheet, YellowBox} from 'react-native'
import {width, U, u} from '../../libs/vars'
import { useMemo } from 'react'

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: 'hsl(0,0%,94%)',

    flex: 1,
    flexDirection: 'column',
  },

  messagesContainer: {
    flex: 1,
    // backgroundColor: 'red',

    //refactor
    paddingTop: 0.5 * U,

    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  Message: {
    // flex: 0,
    maxWidth: 14 * U,
    backgroundColor: 'white',

    marginTop: 0,
    margin: 0.5 * U,
    padding: 0.5 * U,
    // paddingHorizontal: 0.75 * U,
    borderRadius: 0.5 * U,

    flexDirection: 'row',
  },
  Message_fromMe: {
    backgroundColor: 'hsl(0,0%,97%)',
    alignSelf: 'flex-end',
  },
  Message__text: {
    maxWidth: 10 * U,

    fontFamily: 'MPLUSRounded1c-Regular',
    color: 'hsl(0,0%,12%)',
  },
  Message__avatar: {
    marginRight: 0.5 * U,

    width: 1.25 * U,
    height: 1.25 * U,
    borderRadius: U,
  },

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
