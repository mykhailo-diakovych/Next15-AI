export const getApiUrl = (): string => {
   // Check URL param first (allows overriding)
   const envParam =
      typeof window !== "undefined"
         ? new URLSearchParams(window.location.search).get("env")
         : null;

   // Determine environment with priority: URL param > env variable > default to prod
   const environment = envParam || process.env.NEXT_PUBLIC_ENV || "prod";

   // Return the appropriate URL based on environment
   switch (environment) {
      case "local":
         return process.env.NEXT_PUBLIC_LOCALHOST_API_URL;
      case "dev":
         return process.env.NEXT_PUBLIC_DEV_API_URL;
      case "prod":
      default:
         return process.env.NEXT_PUBLIC_VOLTQUANT_API_URL;
   }
};
