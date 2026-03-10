import { ConvexHttpClient } from "convex/browser";

export const convexclient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


