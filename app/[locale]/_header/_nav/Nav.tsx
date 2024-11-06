import React from "react";
import Link from "next-intl/link";
import { getTranslator } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useLocale } from "next-intl";

const links = [
  { href: "/", name: "home", type: "public", role: "user" },
  { href: "/auth/login", name: "login", type: "restricted", role: "user" },
  { href: "/auth/register", name: "register", type: "restricted", role: "user" },
  { href: "/cabinet", name: "cabinet", type: "private", role: "user" },
  { href: "/admin", name: "admin", type: "private", role: "admin" },
];

async function Nav() {
  const locale = useLocale();
  const session = await getServerSession(authOptions);
  const t = await getTranslator(locale, "Navigation");

  const localize = (l: any) => {
    return t(l);
  };
  return (
    <nav>
      <ul>
        {links.map((link, index) => {
          switch (link.type) {
            case "public":
              return (
                <li key={index}>
                  <Link href={link.href}>{localize(link.name)}</Link>
                </li>
              );
            case "restricted":
              if (session === null) {
                return (
                  <li key={index}>
                    <Link href={link.href}>{localize(link.name)}</Link>
                  </li>
                );
              }
              return;
            case "private":
              if (
                session !== null &&
                session.user.role === link.role.toLocaleUpperCase()
              ) {
                return (
                  <li key={index}>
                    <Link href={link.href}>{localize(link.name)}</Link>
                  </li>
                );
              }
              return;
          }
        })}
      </ul>
    </nav>
  );
}

export default Nav;
