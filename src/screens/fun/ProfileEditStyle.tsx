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
  listBlock: {

  },

  input: {},

  avaAndNameBlock: {
    flexDirection: 'row',
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
    backgroundColor: 'hsl(0,0%,94%)'
  },
  dateOfBirth__text: {
    fontFamily: 'MPLUSRounded1c-Regular'
  },
  dateOfBirth__text_value: {
    fontFamily: 'MPLUSRounded1c-Bold'
  },

  interestsContainer: {
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

})
