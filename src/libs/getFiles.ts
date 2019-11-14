import ImagePicker from 'react-native-image-crop-picker';
import {pickerSettings} from './vars';

export const getFiles = async (type: string) => {
  return new Promise((resolve, reject) => {
    switch (type) {
      case 'PHOTO': {
        ImagePicker.openCamera(pickerSettings.capturePhoto)
          .then((image: any) => {
            resolve([image]);
          })
          .catch(e => {
            reject(e);
          });
      }
      case 'VIDEO': {
        ImagePicker.openCamera(pickerSettings.recordVideo)
          .then((image: any) => {
            resolve([image]);
          })
          .catch(e => {
            reject(e);
          });
      }
      case 'GALLERY': {
        ImagePicker.openPicker(pickerSettings.galleryFiles)
          .then((image: any) => {
            resolve(image);
          })
          .catch(e => {
            reject(e);
          });
      }
      default: {
        return null;
      }
    }
  });
};
