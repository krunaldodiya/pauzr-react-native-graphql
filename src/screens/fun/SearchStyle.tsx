/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {StyleSheet} from 'react-native'
import {width, U, u} from '../../libs/vars'
import { useMemo } from 'react'

export default StyleSheet.create({
  // todo generalize and move to common style file
  mainContainer: {
    margin: U,
    flex: 1,

    borderRadius: U,
    backgroundColor: 'white',
    overflow: 'hidden',

    elevation: 32, // todo ios ; todo plugin for android for svg shadow (or what is uses now),
  },
  mainContainer_clay: {
    marginBottom: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  inputConteiner: {
    flexDirection: 'row',
  },
  inputConteiner__icon: {
    alignSelf: 'center',
    margin: u,
  },
  input: {
    flex: 1,

    fontFamily: 'MPLUSRounded1c-Regular' // todo replace with theme.fonts
  },

  categoriesContainer: {
    // margin: 0.5 * U,

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer__note: {
    width: 12 * U,
    // backgroundColor: 'red',

    marginVertical: 2 * u,

    fontSize: 2.5 * u,
    fontFamily: 'MPLUSRounded1c-Regular',
    color: 'hsl(0,0%,36%)', // todo, forgot to move to vars/colors or something
  },

  Category: {
    // marginLeft: 0.5 * U,
    // marginTop:  0.5 * U,
    margin: 0.25 * U,
    width: 4 * U,
    height: 4 * U,

    backgroundColor: 'black', // temp

    borderRadius: 2 * u,
    overflow: 'hidden',
  },
  Category__name: {
    position: 'absolute',
    left: 0.75 * U,
    bottom: 0.75 * U,

    fontSize: 0.75 * U,
    fontFamily: 'MPLUSRounded1c-Regular',
    color: 'white',

    textShadowColor: 'black',
    textShadowRadius: 2 * u, // todo refactor
  },
  Category__bg: {
    width:  4 * U,
    height: 4 * U,

    opacity: 0.5,
  },
})
