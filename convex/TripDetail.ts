import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ✅ Create a trip detail
export const CreateTripDetail = mutation({
  args: {
    tripId: v.string(),
    uid: v.id("UserTable"),
    tripDetail: v.any()
  },
  handler: async (ctx, args) => {
    try {
      console.log("Incoming args:", args);
      const _id = await ctx.db.insert("TripDetailTable", {
        tripId: args.tripId,
        tripDetail: args.tripDetail,
        uid: args.uid
      });
      return { _id };
    } catch (err) {
      console.error("CreateTripDetail error:", err);
      throw new Error("Failed to create trip detail. See logs for details.");
    }
  }
});


// ✅ Get all trips for a user
export const GetUserTrips = query({
  args: { uid: v.id("UserTable") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("TripDetailTable")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .order("desc")
      .collect();
  },
});

// ✅ Get trip by tripId
export const GetTripById = query({
  args: {
    uid: v.id("UserTable"),
    tripid: v.string()
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("TripDetailTable")
      .filter((q) =>
        q.and(
          q.eq(q.field("uid"), args.uid),
          q.eq(q.field("tripId"), args.tripid)
        )
      )
      .collect();

    return result[0] || null;
  },
});
