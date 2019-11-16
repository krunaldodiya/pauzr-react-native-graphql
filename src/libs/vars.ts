import {Dimensions} from 'react-native';

const baseUrlProd = 'https://pauzr.tk';
const httpUrlProd = 'https://pauzr.tk/graphql';
const wsUrlProd = 'wss://pauzr.tk/graphql';

const baseUrlDev = 'https://vapor.test';
const httpUrlDev = 'https://vapor.test/graphql';
const wsUrlDev = 'wss://vapor.test/graphql';

const baseUrl = __DEV__ ? baseUrlDev : baseUrlProd;
const httpUrl = __DEV__ ? httpUrlDev : httpUrlProd;
const wsUrl = __DEV__ ? wsUrlDev : wsUrlProd;

export {baseUrl, httpUrl, wsUrl, httpUrlProd, wsUrlProd};

export const pickerSettings = {
  capturePhoto: {mediaType: 'photo'},
  recordVideo: {mediaType: 'video'},
  galleryFiles: {multiple: true},
};

export const {width, height} = Dimensions.get('window');

export const U = width / 16;
export const u = width / 64;
