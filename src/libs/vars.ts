const baseUrlProd = 'https://api.pauzr.com';
const httpUrlProd = 'https://api.pauzr.com/api/v1';
const wsUrlProd = 'ws://api.pauzr.com';
const themeUrlProd = 'https://www.pauzr.com';

// const httpUrlDev = 'http://pauzr-backend.test';
// const wsUrlDev = 'ws://pauzr-backend.test';

// const httpUrl = __DEV__ ? httpUrlDev : httpUrlProd;
// const wsUrl = __DEV__ ? wsUrlDev : wsUrlProd;

const httpUrl = httpUrlProd;
const wsUrl = wsUrlProd;

export {baseUrlProd, httpUrl, wsUrl, themeUrlProd};

export const pickerSettings = {
  capturePhoto: {cropping: true, mediaType: 'photo'},
  recordVideo: {mediaType: 'video'},
  galleryFiles: {multiple: true},
};
