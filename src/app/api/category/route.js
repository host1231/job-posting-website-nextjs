import Category from "@/models/Category";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.formData();
    
    const title = data.get("Title");
    const logo = data.get("Logo");


    if (!title ||  logo.size === 0) {
        return NextResponse.json({ message: "Все данные обязательны!" }, { status: 400 });
    }
    
    try {
        const existingTitle = await Category.findOne({title});
        if (existingTitle) {
            return NextResponse.json({ message: "Название должно быть уникальными!" }, { status: 400 });
        }


        const blob = await put(logo.name, logo, {
            access: "public",
            addRandomSuffix: true
        });

        await Category.create({
            title,
            imageUrl: blob.url
        });

        return NextResponse.json({ message: "Категория успешно добавлен" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ошибка создания категория" }, { status: 500 });
    }

}

export async function GET() {
    try {
        const categories = await Category.find();

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ошибка получение категорий" }, { status: 500 });
    }
}