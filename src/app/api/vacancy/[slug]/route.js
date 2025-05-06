import connectDB from "@/config/connectDB";
import Vacancy from "@/models/Vacancy";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    const { slug } = params;

    try {
        await connectDB();
        await Vacancy.findOneAndDelete({ slug });
        return NextResponse.json({ message: "Вакансия успешна удалена!" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ошибка удаление вакансии" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    const { slug } = params;

    try {
        await connectDB();

        const vacancy = await Vacancy.findOne({ slug }).populate("company").populate("categories");

        return NextResponse.json(vacancy, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Ошибка получение вакансии", { status: 500 });
    }
}


const viewCache = new Map();
const COOLDOWN = 24 * 60 * 60 * 1000; // 24 час

function getClientIp(req) {
    const forwarded = req.headers.get("x-forwarded-for");
    console.log(forwarded)
    return forwarded ? forwarded.split(",")[0] : "unknown";
}

export async function PATCH(req, { params }) {
    await connectDB();

    const { slug } = params;
    const ip = getClientIp(req);
    const key = `${ip}:${slug}`;
    const now = Date.now();

    if (viewCache.has(key) && now - viewCache.get(key) < COOLDOWN) {
        return NextResponse.json({ msg: "Просмотр уже засчитан недавно" });
    }

    viewCache.set(key, now);

    try {
        const vacancy = await Vacancy.findOneAndUpdate(
            { slug },
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!vacancy) {
            return NextResponse.json({ error: "Вакансия не найдена" }, { status: 404 });
        }

        return NextResponse.json({ views: vacancy.views });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Ошибка обновления просмотров" }, { status: 500 });
    }
}
