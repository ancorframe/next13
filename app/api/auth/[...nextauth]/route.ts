import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const baseURL = process.env.BACKEND_URL;

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(`${baseURL}/auth/refresh-token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token.user.refreshToken }),
    });
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      user: {
        ...token.user,
        accessTokenExpires: Date.now() + 1 * 60 * 1000,
        accessToken: refreshedTokens.accessToken,
        refreshToken: refreshedTokens.refreshToken
      },
    };
  } catch (error) {
    // console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        console.log(user);
        
        if (user) {
          return Promise.resolve(user);
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const accessTokenExpires = Date.now() + 1 * 60 * 1000;
        // console.log("accessTokenExpires", accessTokenExpires);

        token.user = { ...user, accessTokenExpires };
      }
      // console.log("token", token);

      if (Date.now() < token.user.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = token.user;
        // session.accessToken = token.accessToken;
        // session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
