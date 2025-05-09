import connectDB from "@/config/connectDB";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function DELETE (request, {params}) {
    const {slug} = params;
    
    try {
        await connectDB();
        await Category.findOneAndDelete({slug});
        return NextResponse.json({msg: "Категория успешна удалена!"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg: "Ошибка удаление категория"}, {status: 500});
    }
}