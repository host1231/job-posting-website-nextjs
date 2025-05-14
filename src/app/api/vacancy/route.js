import connectDB from "@/config/connectDB";
import { toSlug } from "@/lib/slug";
import Company from "@/models/Company";
import Category from "@/models/Category";
import Vacancy from "@/models/Vacancy";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import isAdmin from "@/lib/auth";

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const categories = searchParams.get("categories");
        const types = searchParams.get("types");
        const education = searchParams.get("education");
        const experience = searchParams.get("experience");
        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;

        const filters = {};

        if (categories) {
            const slugArray = categories.split(",");
            const foundCategories = await Category.find({ slug: { $in: slugArray } }).select("_id");
            const categoryIds = foundCategories.map(cat => cat._id);
            filters.categories = { $in: categoryIds };
        }

        if (types) filters.type = { $in: types.split(",") };
        if (education) filters.education = { $in: education.split(",") };
        if (experience) filters.experience = { $in: experience.split(",") };
        if (search) filters.title = { $regex: search, $options: "i" };

        console.log(filters)

        const skip = (page - 1) * limit;

        const [vacancies, total] = await Promise.all([
            Vacancy.find(filters)
                .populate("company")
                .populate("categories")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            Vacancy.countDocuments(filters)
        ]);

        return NextResponse.json({
            vacancies,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Ошибка получение вакансии" }, { status: 500 });
    }
}

export async function POST(request) {
    const { title, company, categories, salary, type, experience, education, description, requirements, email, expiresAt } = await request.json();
    const admin = await isAdmin();

    if (!title || !company || !categories || !type || !experience || !education || !description || !requirements || !email || !expiresAt) {
        return NextResponse.json({ msg: "Все данные обязательны!" }, { status: 400 });
    }

    if (!admin) {
        return NextResponse.json({ msg: "Нет доступа!" }, { status: 403 });
    }

    try {
        await connectDB();

        const expiresDate = new Date(Date.now() + (Number(expiresAt) * 24 * 60 * 60 * 1000));

        const categoryDocs = await Category.find({ slug: { $in: categories } });
        const categoryIds = categoryDocs.map((cat) => cat._id);

        const count = await Vacancy.countDocuments();

        await Vacancy.create({
            title,
            slug: `${toSlug(title)}-${count}`,
            company,
            categories: categoryIds,
            salary: salary ? salary : "",
            type,
            experience,
            education,
            description,
            requirements,
            email,
            expiresAt: expiresDate
        });

        return NextResponse.json({ msg: "Вакансия успешно добавлено" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Ошибка добавления вакансии" }, { status: 500 });
    }

}