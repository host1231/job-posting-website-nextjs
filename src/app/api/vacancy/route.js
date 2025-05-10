import connectDB from "@/config/connectDB";
import { toSlug } from "@/lib/slug";
import Company from "@/models/Company";
import Category from "@/models/Category";
import Vacancy from "@/models/Vacancy";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import isAdmin from "@/lib/auth";

export async function GET() {
    try {
        await connectDB();

        const vacancies = await Vacancy.find()
            .populate("company")
            .populate("categories");

        return NextResponse.json(vacancies, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Ошибка получение вакансии" }, { status: 500 });
    }
}

export async function POST(request) {
    const { title, company, categories, salary, type, experience, education, description, requirements, email } = await request.json();
    const admin = await isAdmin();

    if (!title || !company || !categories || !type || !experience || !education || !description || !requirements || !email) {
        return NextResponse.json({ msg: "Все данные обязательны!" }, { status: 400 });
    }

    if (!admin) {
        return NextResponse.json({ msg: "Нет доступа!" }, { status: 403 });
    }

    try {
        await connectDB();

        const count = await Vacancy.countDocuments();

        await Vacancy.create({
            title,
            slug: `${toSlug(title)}-${count}`,
            company,
            categories,
            salary: salary ? salary : "",
            type,
            experience,
            education,
            description,
            requirements,
            email
        });

        return NextResponse.json({ msg: "Вакансия успешно добавлено" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Ошибка добавления вакансии" }, { status: 500 });
    }

}