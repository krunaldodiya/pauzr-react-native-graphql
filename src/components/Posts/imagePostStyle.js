/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import { StyleSheet, Dimensions } from 'react-native'

// todo move to global style utils
const {width} = Dimensions.get('window')
export const U = width / 16
export const u = width / 64

export default StyleSheet.create({
  postContainer: {
    margin: U,
    marginBottom: 0, // todo refactor

    borderRadius: U,
    backgroundColor: 'white',
    overflow: 'hidden',

    elevation: 32, // todo ios ; todo plugin for android for svg shadow (or what is uses now),
  },
  postContentContainer: {
    borderRadius: U,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 12,
  },
  postContentContainer__bottomPlane: { // todo rename
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    padding: 0.5 * U,
    borderRadius: U,
  },
  authorAvatar: {
    width: 2 * U,
    height: 2 * U,
    // borderRadius: U - u,
    borderRadius: U - u / 2,
    overflow: 'hidden',
  },
  authorName: {
    marginLeft: 0.72 * U,
    flex: 1,

    color: 'hsl(0, 0%, 24%)',
    fontSize: 0.72 * U,
    fontFamily: 'MPLUSRounded1c-Regular', // todo rounded mplus1
  },

  image: {
    borderRadius: U,
  },
})
