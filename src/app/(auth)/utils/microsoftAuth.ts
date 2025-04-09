export interface MicrosoftAuthConfig {
   tenantId: string;
   clientId: string;
   baseUrl: string;
   scopes: string[];
}

export const MICROSOFT_AUTH_CONFIG: MicrosoftAuthConfig = {
   tenantId: process.env.NEXT_PUBLIC_AUTH_MICROSOFT_TENANT_ID ?? "",
   clientId: process.env.NEXT_PUBLIC_AUTH_MICROSOFT_ID ?? "",
   baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "",
   scopes: ["openid", "profile", "email"],
} as const;

export const constructMicrosoftOAuthUrl = (
   config: MicrosoftAuthConfig,
): string => {
   const params = new URLSearchParams({
      client_id: config.clientId,
      response_type: "code",
      redirect_uri: `${config.baseUrl}/login/callback`,
      scope: config.scopes.join(" "),
      response_mode: "query",
   });

   return `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/authorize?${params.toString()}`;
};
