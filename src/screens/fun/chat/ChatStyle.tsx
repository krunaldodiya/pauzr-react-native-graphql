/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {StyleSheet, YellowBox} from 'react-native';
import {width, U, u} from '../../../libs/vars';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: 'hsl(0,0%,94%)',

    flex: 1,
    flexDirection: 'column',
  },

  messagesContainer: {
    // backgroundColor: 'red',

    //refactor
    paddingTop: 0.5 * U,
    // justifyContent: 'flex-end',
    // alignContent: 'flex-end',
    // alignItems: 'flex-end',
    // alignSelf: 'flex-end',
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

    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  Message_fromMe: {
    backgroundColor: '#e7e2f8',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  Message__text: {
    maxWidth: 10 * U,

    fontFamily: 'MPLUSRounded1c-Regular',
    color: 'hsl(0,0%,12%)',

    marginBottom: u,
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
    backgroundColor: 'white',
    // height: 2 * U,
    // borderTopWidth: 0.5,
    borderWidth: 0.5,
    margin: 5,
    borderColor: 'hsl(0,0%,64%)',
    // borderTopLeftRadius: U,
    // borderTopRightRadius: U,
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

  header: {
    flexDirection: 'row',
    backgroundColor: 'hsl(0,0%,92%)',
  },
  header__avatar: {
    margin: 0.75 * U,
    marginRight: 0,
    marginLeft: U,

    width: 1.25 * U,
    height: 1.25 * U,
    borderRadius: U,
  },
  header__name: {
    color: 'hsl(0,0%,24%)',
    fontFamily: 'MPLUSRounded1c-Regular',
    fontSize: 0.5 * U,

    margin: U,
  },

  messageStatus: {
    // alignSelf: 'flex-end',
    // marginRight: -u*0.5,
    // marginLeft: u*0.5,
    position: 'absolute',
    right: -U * 1.25,
    bottom: u * 2,
  },
  messageStatus_fromMe: {
    right: undefined,
    left: -U * 1.25,
  },

  message__time: {
    // display: 'none',
    position: 'absolute',
    // top: U * 2,
    // left: U * 0.125,
    bottom: U * 0.125,
    right: U * 0.125,

    backgroundColor: 'white',
    paddingHorizontal: u,
    borderRadius: u,

    color: 'hsl(0,0%,36%)',
    fontFamily: 'MPLUSRounded1c-Regular',
    fontSize: 0.5 * U,
  },

  DateSeparator: {
    height: 0.5,
    backgroundColor: 'hsl(0,0%,80%)',
    alignSelf: 'stretch',
    borderRadius: 2,

    // marginVertical: U,
    margin: U,
  },
  DateSeparator__text: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    backgroundColor: 'hsl(0,0%,94%)',
    alignSelf: 'center',
    paddingHorizontal: U,

    marginTop: -1 * 0.25 * U - u * 0.675,

    color: 'hsl(0,0%,24%)',
    fontFamily: 'MPLUSRounded1c-Regular',
    fontSize: 0.5 * U,
  },
});
