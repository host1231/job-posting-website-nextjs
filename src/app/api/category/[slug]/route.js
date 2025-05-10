import connectDB from "@/config/connectDB";
import isAdmin from "@/lib/auth";
import Category from "@/models/Category";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    const { slug } = params;
    const admin = await isAdmin();

    if (!admin) {
        return NextResponse.json({ msg: "Нет доступа!" }, { status: 403 });
    }

    try {
        await connectDB();
        await Category.findOneAndDelete({ slug });
        return NextResponse.json({ msg: "Категория успешна удалена!" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Ошибка удаление категория" }, { status: 500 });
    }
}