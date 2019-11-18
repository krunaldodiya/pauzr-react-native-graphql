export const useSetAuth = async ({user, token}: any, authUser: any) => {
  const initialScreen = user.language == null ? 'SelectLanguage' : 'Home';

  return {initialScreen};
};
