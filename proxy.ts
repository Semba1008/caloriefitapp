import authMiddleware from "next-auth/middleware";

export default authMiddleware;

export const config = {
  matcher: ["/dashboard/:path*", "/history/:path*", "/settings/:path*", "/onboarding"],
};
