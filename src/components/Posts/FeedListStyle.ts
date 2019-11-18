/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {StyleSheet} from 'react-native'
import {width, U, u} from '../../libs/vars'

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
  postContentContainer__topPlane: { // todo rename
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
    // flex: 1,

    color: 'hsl(0, 0%, 24%)',
    fontSize: 0.68 * U,
    fontFamily: 'MPLUSRounded1c-Regular', // todo rounded mplus1
  },
  totalLikes: {
    color: 'hsl(0, 0%, 24%)',
    fontSize: 0.54 * U,
    fontFamily: 'MPLUSRounded1c-Bold',
    marginRight: 0.64 * U / 2,
  },

  timestampAndCategory: {
    // margin: u,
    margin: 0.5 * U,
    marginBottom: 0,

    flexDirection: 'row',
  },

  button: {
    marginRight: 0.64 * U / 2,
  },

  bottomContainer: {
    margin: 0.5 * U,
    flexDirection: 'row',
    // alignItems: 'stretch',
    alignItems: 'center',

    marginRight: 0.25 * U,   // todo refactor
  },
  description: {
    // margin: 0.5 * U,
    // // marginBottom: -0.25 * U,
    // marginBottom: 0 * U,
    margin: U,
    marginTop: 0.75 * U,
    marginBottom: 0,
    marginRight: 2 * U,

    color: 'hsl(0, 0%, 24%)',
    fontSize: 0.54 * U,
    fontFamily: 'MPLUSRounded1c-Regular',
    textAlign: 'left',
  },
  timestamp: {
    // margin: 0.5 * U,

    color: 'hsl(0, 0%, 36%)',
    fontSize: 0.44 * U,
    fontFamily: 'MPLUSRounded1c-Regular',
    // textAlign: 'center',
  },
  category: {
    // marginLeft: U,
    marginLeft: 0.75 * U,

    color: 'hsl(0, 0%, 36%)',
    fontSize: 0.44 * U,
    fontFamily: 'MPLUSRounded1c-Regular',
  },
  button_bottom: {
    marginRight: 0,
    // flex: 1,
    width: 2 * 0.64 * U,  // todo refactor
    // backgroundColor:'red',
    // textAlignVertical: 'center',
  },


  image: {
    borderRadius: U,
  },

  FollowLabel: {
    flex: 0,
    alignSelf: 'flex-start',

    // margin: u,
    padding: 0.5 * u,
    borderRadius: 1.5 * u,
    backgroundColor: 'white',
    elevation: 4, // todo ios

    color: 'hsl(0, 0%, 36%)',
    fontSize: 2 * u,
    fontFamily: 'MPLUSRounded1c-Regular',
  },
})
