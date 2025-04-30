import {withAuth} from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req){
        const token = req.nextauth.token;

        if (token && (
            req.nextUrl.pathname === "/signin" ||
            req.nextUrl.pathname === "/signup"
        )) {
            return NextResponse.redirect(new URL('/', req.url));
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({token, req}) => {
                const {pathname} = req.nextUrl;

                if (pathname === "/signin" || pathname === "/signup") {
                    return true;
                }
                return !!token
            }
        }
    }

)


// export const config = {
//     matcher : [
//         // '/dashboard/:path*',
//         '/signin',
//         '/signup',
//         // '/editor/:path*'
//     ]
// }