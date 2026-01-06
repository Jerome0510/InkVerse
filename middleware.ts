import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PAGE_PROTECTED_PATHS = [/^\/histories\/\d+\/steps\/\d+$/];
const API_PROTECTED_PATHS = [
  /^\/api\/categories\/\d+\/histories/,
  /^\/api\/users\/\d+\/progress/,
];
const API_PUBLIC_PATHS = [/^\/api\/categories$/, /^\/api\/categories\/\d+$/];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPage = PAGE_PROTECTED_PATHS.some((path) =>
    path.test(pathname)
  );
  const isProtectedAPI = API_PROTECTED_PATHS.some((path) =>
    path.test(pathname)
  );
  const isPublicAPI = API_PUBLIC_PATHS.some((path) => path.test(pathname));

  if (isPublicAPI) {
    return NextResponse.next();
  }

  if (isProtectedPage || isProtectedAPI) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      if (isProtectedPage) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
      }

      if (isProtectedAPI) {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/histories/:path*/steps/:path*/",
    "/histories/:path*",
    "/api/:path*",
  ],
};
