/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {StyleSheet, YellowBox} from 'react-native'
import {width, U, u} from '../libs/vars'

export const fontColor = 'hsl(0,0%,36%)';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: 'hsl(0,0%,94%)',

    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    alignContent: 'center',
    alignItems: 'baseline',
  },

  avatar: {
    margin: 1 * U,

    width: 6 * U,
    height: 6 * U,
    borderRadius: 6 * U,
    overflow: 'hidden',
    
    alignSelf: 'center',

    elevation: 32,
  },
  name: {
    margin: 0.5 * U,
    color: 'hsl(0,0%,24%)',
    fontSize: U,
    lineHeight: U,
    fontFamily: 'MPLUSRounded1c-Regular',

    alignSelf: 'center',

    marginBottom: 1.25 * U,
  },
  divider: {
    height: 1,
    alignSelf: 'stretch',

    backgroundColor: 'hsl(0,0%,84%)',

    marginVertical: 1 * U,
  },

  label: {
    flexDirection: 'row',
    alignItems: 'baseline',

    marginVertical: 0.25 * U,

    // refactor
    // alignSelf: 'flex-end',
    // marginRight: 3.25 * U,
    // alignSelf: 'flex-start',
    marginLeft: 2.25 * U,
  },
  label__text: {
    color: fontColor,
    fontSize: 0.75 * U,
    lineHeight: U,
    fontFamily: 'MPLUSRounded1c-Regular',
    textDecorationLine: 'underline',
  },
  label__icon: {
    marginRight: u,
    width: 2 * U,
  },

  mainLabelsScroll: {
    // backgroundColor: 'blue',
    maxHeight: 8 * U,
  },
  mainLabelsContainer: {
    // height: 10 * U,
    // backgroundColor: 'red',
  },
})
