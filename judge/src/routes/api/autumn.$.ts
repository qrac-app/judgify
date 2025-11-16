// routes/api/autumn.$.ts

import { createAPIFileRoute } from "@tanstack/react-router";
// import { auth } from "~/lib/auth";
import { autumnHandler } from "autumn-js/tanstack";
import { auth } from "convex/auth";

const handler = autumnHandler({
  identify: async ({ request }) => {
    // get the user from your auth provider (example: better-auth)
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    return {
      customerId: session?.user.id,
      customerData: {
        name: session?.user.name,
        email: session?.user.email,
      },
    };
  },
});

export const APIRoute = createAPIFileRoute("/api/autumn/$")(handler);