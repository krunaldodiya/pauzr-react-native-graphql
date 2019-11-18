/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {StyleSheet} from 'react-native'
import {width, U, u} from '../../libs/vars'
import { useMemo } from 'react'

export default StyleSheet.create({
  // todo generalize and move to common style file
  mainContainer: {
    flex: 1,
    flexDirection: 'column'
  },

  aboutContainer: {
    margin: U,
    marginBottom: 0,

    backgroundColor: 'hsl(0, 0%, 94%)',
    borderRadius: U,
  },

  aboutContainer__avaAndMeta: {
    margin: U,
    // marginHorizontal: U,
    // backgroundColor: 'blue',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
  metaBlock: {
    flex: 2,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  metaBlock__text: {
    color: '#000',
    fontFamily: 'MPLUSRounded1c-Regular', // todo replace with theme.fonts
  },
  metaBlock__text_number: {
    fontFamily: 'MPLUSRounded1c-Bold',
  },
  avatar: {
    width: 2 * U,
    height: 2 * U,
    // borderRadius: U - u,
    borderRadius: U - u / 2,
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



})
