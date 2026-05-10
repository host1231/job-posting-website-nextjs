import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const adminRoutes = ["/add-vacancy", "/add-company"];

    const isAdminRoute = adminRoutes.some((path) =>
        req.nextUrl.pathname.startsWith(path)
    );

    if (isAdminRoute && token?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/add-vacancy/:path*",
        "/add-company/:path*",
    ],
};