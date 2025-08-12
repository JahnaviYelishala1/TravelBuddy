import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists by email
    const existing = await ctx.db
      .query("UserTable")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (existing.length > 0) {
      return existing[0]; // Already exists
    }

    // Create new user
    const _id = await ctx.db.insert("UserTable", {
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl
    });

    // Return full user object
    return { _id, ...args };
  },
});
