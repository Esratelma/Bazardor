import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
const uri=process.env.MONGODB_URI;
const client=uri?new MongoClient(uri):null;
const db=client?.db("bazardor");
export const auth = betterAuth({
  ...(db ? { database: mongodbAdapter(db) } : {}),
  secret: process.env.BETTER_AUTH_SECRET || "development-only-secret-change-this-before-deploying-123456",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: { enabled: true },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? { google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET } } : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? { github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET } } : {})
  },
  user: { changeEmail: { enabled: false } }
});