import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qqxycy13",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN, // Token for authenticated requests
  apiVersion: "2025-10-01", // Use the latest stable API version unless specified
  useCdn: false, // Enable CDN in production for better performance
});
