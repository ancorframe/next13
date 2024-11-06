"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

interface Prop {
  children: React.ReactNode;
}

function NextSessionProvider({ children }: Prop) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextSessionProvider;
