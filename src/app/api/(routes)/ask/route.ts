import { NextRequest } from "next/server";

import { askRequestSchema } from "@/app/api/features/ask/validators";

import { AskRequest } from "@/app/api/features/ask/interfaces";

import { env } from "@utils/env";

async function validateRequest(req: NextRequest) {
   const body = await req.json();

   try {
      return askRequestSchema.parse(body);
   } catch (error) {
      throw new Error("Invalid request data");
   }
}

async function fetchVoltAPI(data: AskRequest) {
   const url = data.conversationId
      ? `${env.VOLTQUANT_API_URL}?conversationId=${data.conversationId}`
      : env.VOLTQUANT_API_URL;

   try {
      const response = await fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ question: data.question }),
      });

      if (!response.ok) {
         throw new Error(`Volt API error: ${response.statusText}`);
      }

      return response.json();
   } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Failed to fetch from Volt API");
   }
}

export async function POST(req: NextRequest) {
   try {
      const data = await validateRequest(req);

      const response = await fetchVoltAPI(data);

      return new Response(JSON.stringify(response), {
         headers: {
            "Content-Type": "application/json",
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
         },
      });
   } catch (error) {
      if (error instanceof Error) {
         return new Response(
            JSON.stringify({
               error: error.message,
            }),
            {
               headers: { "Content-Type": "application/json" },
            },
         );
      }

      return new Response(JSON.stringify({ error: "Internal server error" }), {
         status: 500,
         headers: { "Content-Type": "application/json" },
      });
   }
}
