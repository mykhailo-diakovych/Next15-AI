// Define .env variables types
declare global {
   namespace NodeJS {
      interface ProcessEnv {
         NEXT_PUBLIC_VOLTQUANT_API_URL: string;
         NEXT_PUBLIC_AUTH_MICROSOFT_ID: string;
         NEXT_PUBLIC_AUTH_MICROSOFT_TENANT_ID: string;
         NEXT_PUBLIC_SPEECH_SUBSCRIPTION_KEY: string;
         NEXT_PUBLIC_SPEECH_REGION: string;
         NEXT_PUBLIC_BASE_URL: string;
         NEXT_PUBLIC_ENV: string;
         NEXT_PUBLIC_LOCALHOST_API_URL: string;
         NEXT_PUBLIC_DEV_API_URL: string;
         NEXT_PUBLIC_FUNCTIONS_KEY: string;
      }
   }
}

export {};
