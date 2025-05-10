import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcryptjs";
import connectDB from "@/config/connectDB";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", value: "text"},
                password: {label: "Password", value: "text"}
            },
            async authorize(credentials, req) {
                if (!credentials.email || !credentials.password) {
                    throw new Error("Все поля обязательны");
                }

                try {
                    await connectDB();
                    const user = await User.findOne({email: credentials.email});
                    if (!user) {
                        throw new Error("Неверный логин или пароль!")
                    }

                    const matchedPassword = await compare(credentials.password, user.password);
                    if (!matchedPassword) {
                        throw new Error("Неверный логин или пароль!")
                    }

                    return {
                        id: user._id,
                        name: user.username,
                        email: user.email,
                        role: user.role,
                    }
                } catch (error) {
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                console.log("User login: ", user);
                token.role = user.role;
            }
            return token;
        },
        async session({session, token}) {
            if (session.user) {
                session.user.role = token.role
            }
            return session;
        }
    },
    pages: {
        signIn: "/signin",
        error: "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET
}