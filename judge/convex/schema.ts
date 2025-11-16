// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    email: v.optional(v.string()),
    createdAt: v.number(),
    autumnCustomerId: v.optional(v.string()),
  })
    .index("by_username", ["username"])
    .index("by_email", ["email"])
    .index("by_autumnCustomerId", ["autumnCustomerId"]),

  matches: defineTable({
    hostId: v.id("users"),
    guestId: v.union(v.id("users"), v.null()),
    problemId: v.string(),
    createdAt: v.number(),
    startedAt: v.union(v.number(), v.null()),
    finishedAt: v.union(v.number(), v.null()),
    state: v.union(
      v.literal("created"),
      v.literal("started"),
      v.literal("finished"),
      v.literal("cancelled")
    ),
    events: v.array(
      v.object({
        id: v.string(),
        type: v.union(
          v.literal("cursor"),
          v.literal("code"),
          v.literal("message"),
          v.literal("submission"),
          v.literal("system")
        ),
        userId: v.union(v.id("users"), v.null()),
        timestamp: v.number(),
        payload: v.any(),
      })
    ),
    result: v.optional(
      v.union(
        v.object({
          winnerId: v.optional(v.union(v.id("users"), v.null())),
          loserId: v.optional(v.union(v.id("users"), v.null())),
          score: v.optional(v.record(v.string(), v.number())),
          reason: v.optional(v.string()),
        }),
        v.null()
      )
    ),
    paid: v.optional(v.boolean()),
    billing: v.optional(
      v.union(
        v.object({
          autumnCustomerId: v.optional(v.string()),
          productId: v.optional(v.string()),
          checkoutUrl: v.optional(v.string()),
          priceCents: v.optional(v.number()),
        }),
        v.null()
      )
    ),
  })
    .index("by_hostId", ["hostId"])
    .index("by_guestId", ["guestId"])
    .index("by_state", ["state"])
    .index("by_createdAt", ["createdAt"])
    .index("by_hostId_state", ["hostId", "state"])
    .index("by_guestId_state", ["guestId", "state"]),
});