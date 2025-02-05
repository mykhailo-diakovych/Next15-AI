import { z } from "zod";

const envSchema = z.object({
   VOLTQUANT_API_URL: z.string(),
});

export const env = envSchema.parse(process.env);
