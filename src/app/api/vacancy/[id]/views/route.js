import connectDB from "@/config/connectDB";
import Vacancy from "@/models/Vacancy";
import { NextResponse } from "next/server";

export async function PATCH(req, {params}) {
    const {id} = params;

    try {
        await connectDB();

        const vacancy = await Vacancy.findByIdAndUpdate(
            id,
            {$inc: {views: 1}},
            {new: true}
        );

        if (!vacancy) {
            return NextResponse.json({msg: "Вакансия не найдена"}, {status: 404});
        }

        return NextResponse.json({views: vacancy.views}, {status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Ошибка обновления просмотров"}, {status: 500});
    }
}