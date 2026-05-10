import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function proxy(req) {
        const token = req.nextauth.token;

        const adminRoutes = ["/add-vacancy", "/add-company"];

        const isAdminRoute = adminRoutes.some((path) => req.nextUrl.pathname.startsWith(path));

        if (isAdminRoute && token?.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return true;
            }
        }
    }
);

export const config = {
    matcher: [
        "/add-vacancy",
        "/add-company"
    ]
}