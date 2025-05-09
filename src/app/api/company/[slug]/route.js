import connectDB from "@/config/connectDB";
import Company from "@/models/Company";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { slug } = params;

    try {
        await connectDB();

        const company = await Company.findOne({ slug });

        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Ошибка получение компании" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { slug } = params;
    try {
        await connectDB();

        await Company.findOneAndDelete({ slug });
        return NextResponse.json({ msg: "Компания успешна удалена!" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Ошибка удаление компании" }, { status: 500 });
    }
}
