// Define .env variables types
declare global {
   namespace NodeJS {
      interface ProcessEnv {
         VOLTQUANT_API_URL: string;
      }
   }
}

export {};
