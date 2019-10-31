import {baseUrlProd} from './vars';

const getAssets = (url: string) => {
  return `${baseUrlProd}/storage/${url}`;
};

export default getAssets;
