import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(request) {
    const {username, email, password} = await request.json();

    console.log(username, email, password)

    if (!username || !email || !password) {
        return NextResponse.json({message: "Все данные обязательны!"}, {status: 400});
    }

    try {
        await connectDB();

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return NextResponse.json({message: "Такой пользователь существует!"}, {status: 400});
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: passwordHash
        });

        return NextResponse.json({message: "Пользователь успешно создан"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Ошибка регистрации!"}, {status: 500});
    }
}