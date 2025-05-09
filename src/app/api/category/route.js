import connectDB from "@/config/connectDB";
import { toSlug } from "@/lib/slug";
import Category from "@/models/Category";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.formData();

    const title = data.get("Title");
    const logo = data.get("Logo");


    if (!title || logo.size === 0) {
        return NextResponse.json({ msg: "Все данные обязательны!" }, { status: 400 });
    }

    try {
        console.log(title, logo);
        await connectDB();
        const existingTitle = await Category.findOne({ title });
        if (existingTitle) {
            return NextResponse.json({ msg: "Название должно быть уникальными!" }, { status: 400 });
        }


        const blob = await put(logo.name, logo, {
            access: "public",
            addRandomSuffix: true
        });

        await Category.create({
            title,
            slug: toSlug(title),
            imageUrl: blob.url
        });

        return NextResponse.json({ msg: "Категория успешно добавлен" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Ошибка создания категория" }, { status: 500 });
    }

}

export async function GET() {
    try {
        await connectDB();  // Подключаемся к базе данных

        // Агрегируем данные, чтобы получить количество вакансий для каждой категории
        const categoriesWithVacancies = await Category.aggregate([
            {
                $lookup: {
                    from: "vacancies",  // имя коллекции вакансий
                    localField: "_id",   // поле из коллекции Category
                    foreignField: "categories",  // поле из коллекции Vacancy
                    as: "vacancies"  // Создадим массив с вакансиями для каждой категории
                }
            },
            {
                $addFields: {
                    vacanciesCount: { $size: "$vacancies" }  // Подсчитываем количество вакансий в каждой категории
                }
            },
            {
                $project: {
                    // Возвращаем все поля категории
                    title: 1,  // Название категории (если нужно явно указать)
                    slug: 1,   // Слаг категории
                    imageUrl: 1,  // Ссылка на изображение категории
                    vacanciesCount: 1,  // Количество вакансий
                    createdAt: 1,  // Дата создания категории
                    updatedAt: 1   // Дата последнего обновления категории
                    // Убираем _id, если оно не нужно:
                    // _id: 0  
                }
            }
        ]);

        // Возвращаем результат с количеством вакансий для каждой категории
        return NextResponse.json(categoriesWithVacancies, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Ошибка получение категорий" }, { status: 500 });
    }
}