import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";


interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  banned: boolean;
  role: string;
  avatarUrl: string;
  phone: string;
  accessTokenExpires: number;
  accessToken: string;
  refreshToken: string;
  error?: "RefreshAccessTokenError";
}

declare module "next-auth" {
  interface Session {
    user: User
  }
}



declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: User;
    idToken?: string;
  }
}

