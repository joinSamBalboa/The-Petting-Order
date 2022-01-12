namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    dbURI?: string;
    SECRET: string;
    REACT_APP_CLOUDINARY_URL: string;
    REACT_APP_CLOUDINARY_UPLOAD_PRESET: string;
  }
}
