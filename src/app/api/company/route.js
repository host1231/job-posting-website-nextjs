import connectDB from "@/config/connectDB";
import isAdmin from "@/lib/auth";
import { toSlug } from "@/lib/slug";
import Company from "@/models/Company";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();

        const companies = await Company.find();

        return NextResponse.json(companies, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Ошибка получение компании" }, { status: 500 });
    }
}

export async function POST(request) {
    const data = await request.formData();
    const admin = await isAdmin();

    const title = data.get("Title");
    const logo = data.get("Logo");
    const description = data.get("Description");
    const city = data.get("City");
    const year = data.get("Year");
    const amountWorker = data.get("AmountWorker");


    if (!title || logo.size === 0 || !description || !city || !year || !amountWorker) {
        return NextResponse.json({ msg: "Все данные обязательны!" }, { status: 400 });
    }

    if (!admin) {
        return NextResponse.json({ msg: "Нет доступа!" }, { status: 403 });
    }

    try {
        await connectDB();

        const existingTitle = await Company.findOne({ title });
        if (existingTitle) {
            return NextResponse.json({ msg: "Название должно быть уникальными!" }, { status: 400 });
        }


        const blob = await put(logo.name, logo, {
            access: "public",
            addRandomSuffix: true
        });

        await Company.create({
            title,
            slug: toSlug(title),
            imageUrl: blob.url,
            description,
            city,
            year,
            amountWorker
        });

        return NextResponse.json({ msg: "Компания успешно добавлен" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Ошибка создания компании" }, { status: 500 });
    }
}

