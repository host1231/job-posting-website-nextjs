import connectDB from "@/config/connectDB";
import Company from "@/models/Company";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    try {
        const {title} = params; 
        console.log("Title", title);

        await connectDB();

        const company = await Company.findOne({title});

        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ошибка получение компании" }, { status: 500 });
    }
}
