/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import {StyleSheet} from 'react-native';
import {U, u} from '../../libs/vars';

export default StyleSheet.create({
  // todo generalize and move to common style file
  mainContainer: {
    margin: 0.5 * U,
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

  inputContainer: {
    flexDirection: 'row',

    borderBottomWidth: 0.5,
    borderBottomColor: 'hsl(0,0%,80%)',
  },
  inputConteiner__icon: {
    alignSelf: 'center',
    margin: u,
  },
  input: {
    flex: 1,

    fontFamily: 'MPLUSRounded1c-Regular', // todo replace with theme.fonts
  },

  categoriesContainer: {
    // margin: 0.5 * U,
    
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',

    paddingLeft: 0.5 * U,
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
    margin: 0.125 * U ,
    width: 5 * U - u * 2.25,
    height: 5 * U - u * 2.25,

    backgroundColor: 'black', // temp

    borderRadius: 2 * u,
    overflow: 'hidden',
  },
  Category__name: {
    position: 'absolute',
    left: 0.75 * U,
    bottom: 0.75 * U,

    fontSize: 0.625 * U,
    fontFamily: 'MPLUSRounded1c-Regular',
    color: 'white',

    textShadowColor: 'black',
    textShadowRadius: 2 * u, // todo refactor
  },
  Category__bg: {
    width: 6 * U,
    height: 6 * U,

    opacity: 0.25,
  },
});
