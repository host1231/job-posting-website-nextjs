import connectDB from "@/config/connectDB";
import isAdmin from "@/lib/auth";
import Company from "@/models/Company";
import Vacancy from "@/models/Vacancy";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { slug } = params;

    try {
        await connectDB();

        const company = await Company.findOne({ slug });
        if (!company) {
            return NextResponse.json({msg: "Компания не найдена"}, {status: 404});
        }

        const [vacancies, totalVacancies] = await Promise.all([
            Vacancy.find({company: company._id}),
            Vacancy.countDocuments({company: company._id})
        ]);

        return NextResponse.json({
            company,
            vacancies,
            totalVacancies
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Ошибка получение компании" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { slug } = params;
    const admin = await isAdmin();

    if (!admin) {
        return NextResponse.json({ msg: "Нет доступа!" }, { status: 403 });
    }

    try {
        await connectDB();

        await Company.findOneAndDelete({ slug });
        return NextResponse.json({ msg: "Компания успешна удалена!" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Ошибка удаление компании" }, { status: 500 });
    }
}
