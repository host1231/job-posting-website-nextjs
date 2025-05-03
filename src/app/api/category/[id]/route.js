import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function DELETE (request, {params}) {
    const {id} = await params;
    
    try {
        await Category.findByIdAndDelete(id);
        return NextResponse.json({message: "Категория успешна удалена!"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Ошибка удаление категория"}, {status: 500});
    }
}