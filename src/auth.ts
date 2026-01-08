import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./lib/db";

export const { handlers, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const [rows]: any = await db.query(
          "SELECT id FROM users WHERE email = ?",
          [user.email]
        );

        if (rows.length === 0) {
          await db.query(
            `INSERT INTO users (pseudo, avatar, email, provider, provider_id)
             VALUES (?, ?, ?, ?, ?)`,
            [
              user.name ?? null,
              user.image ?? null,
              user.email,
              "google",
              account.providerAccountId,
            ]
          );
        }
      }
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
