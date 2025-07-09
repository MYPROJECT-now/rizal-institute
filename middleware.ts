// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

import { clerkClient, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/ACCOUNTS/admin(.*)',
  '/ACCOUNTS/cashier(.*)',
  '/ACCOUNTS/registrar(.*)',
  '/ACCOUNTS/teacher(.*)',
  '/ACCOUNTS/student(.*)',
]);

const roleRouteMapping = {
  admin: '/ACCOUNTS/admin',
  cashier: '/ACCOUNTS/cashier',
  registrar: '/ACCOUNTS/registrar',
  teacher: '/ACCOUNTS/teacher',
  student: '/ACCOUNTS/student',
};

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return NextResponse.next();

  const { userId } = await auth();
  if (!userId) return NextResponse.redirect(new URL('/portal2', req.url));

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const userRole = user?.publicMetadata?.role as keyof typeof roleRouteMapping;

  if (!userRole) {
    return NextResponse.redirect(new URL('/portal2', req.url));
  }

  const expectedRoute = roleRouteMapping[userRole];
  const currentPath = req.nextUrl.pathname;

  if (!currentPath.startsWith(expectedRoute)) {
    return NextResponse.redirect(new URL(expectedRoute, req.url));
  }

  return NextResponse.next();
});

// Keep config as is
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
