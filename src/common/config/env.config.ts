const {
  API_KEY,
  API_IMAGES_URL,
  API_PHOTO_FILLER,
  API_TOKEN,
  APP_URL
} = process.env;

const ENV = {
  API: {
    KEY: API_KEY as string,
    IMAGES_URL: API_IMAGES_URL as string,
    PHOTO_FILLER: API_PHOTO_FILLER as string,
    TOKEN: API_TOKEN as string,
  },
  APP: {
    URL: APP_URL
  }
};

export { ENV };
