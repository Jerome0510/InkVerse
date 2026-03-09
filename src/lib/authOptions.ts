import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { RowDataPacket } from "mysql2";
import { db } from "./db";

interface UserRows extends RowDataPacket {
  id: number;
}
export const authOptions: NextAuthOptions = {
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
        const [rows] = await db.query<UserRows[]>(
          "SELECT id FROM users WHERE email = ?",
          [user.email],
        );
        if (rows.length === 0) {
          await db.query(
            "INSERT INTO users (pseudo, avatar, email, provider, provider_id) VALUES (?, ?, ?, ?, ?)",
            [
              user.name ?? null,
              user.image ?? null,
              user.email,
              "google",
              account.providerAccountId,
            ],
          );
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
