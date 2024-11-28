import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const adminEmail = "oagudelod@ucundinamarca.edu.co";
export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req }); 
    if (req.nextUrl.pathname.startsWith("/InicioSeccion/admin")) {
      if (!token || token.email !== adminEmail) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/InicioSeccion/usuario/:path*", "/InicioSeccion/admin/:path*"],
};
