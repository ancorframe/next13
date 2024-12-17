import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

const locales = ["en", "uk"];
const privatePages = ["/cabinet", "/admin", "/admin/message"];
const restrictedPages = ["/auth/login", "/auth/register"];
const adminPages = ["/admin",'/admin/message'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  function onSuccess(req) {
      const adminPathnameRegex = RegExp(
        `^(/(${locales.join("|")}))?(${adminPages.join("|")})?/?$`,
        "i"
      );
      const isAdminPage = adminPathnameRegex.test(req.nextUrl.pathname);
    if (isAdminPage && req.nextauth.token?.user.user.userData.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/cabinet", req.url));
    }
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log(token);

        return token != null;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const privatePathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${privatePages.join("|")})?/?$`,
    "i"
  );
  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

  const restrictedPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${restrictedPages.join("|")})?/?$`,
    "i"
  );
  const isRestrictedPage = restrictedPathnameRegex.test(req.nextUrl.pathname);

  if (session && isRestrictedPage) {
    return NextResponse.redirect(new URL("/cabinet", req.url));
  } else if (!session && isRestrictedPage) {
    return intlMiddleware(req);
  } else if (isPrivatePage) {
    return (authMiddleware as any)(req);
  }
  return intlMiddleware(req);

  // if (session && req.nextUrl.pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(new URL("/cabinet", req.url));
  // } else if (!session && req.nextUrl.pathname.startsWith("/auth")) {
  //   return intlMiddleware(req);
  // } else if (req.nextUrl.pathname.startsWith("/cabinet")) {
  //   return (authMiddleware as any)(req);
  // } else if (req.nextUrl.pathname.startsWith("/admin")) {
  //   return (authMiddleware as any)(req);
  // }
  // return intlMiddleware(req);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|public|.*\\..*).*)"],
};
