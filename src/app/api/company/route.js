import connectDB from "@/config/connectDB";
import Company from "@/models/Company";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();

        const companies = await Company.find();

        
        // const companiesWithVacanciesCount = await Company.aggregate([
        //     {
        //         $lookup: {
        //             from: 'vacancy', // имя коллекции вакансий
        //             localField: '_id',  // поле в коллекции companies
        //             foreignField: 'company',  // поле в коллекции vacancies, которое ссылается на companyId
        //             as: 'vacancies'
        //         }
        //     },
        //     {
        //         $project: {
        //             name: 1,  // отображаем имя компании
        //             vacanciesCount: { $size: '$vacancy' }  // подсчитываем количество вакансий
        //         }
        //     }
        // ]);

        // console.log(companiesWithVacanciesCount)

        return NextResponse.json(companies, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ошибка получение компании" }, { status: 500 });
    }
}

export async function POST(request) {
    const data = await request.formData();

    const title = data.get("Title");
    const logo = data.get("Logo");
    const description = data.get("Description");
    const city = data.get("City");
    const year = data.get("Year");
    const amountWorker = data.get("AmountWorker");


    if (!title || logo.size === 0 || !description || !city || !year || !amountWorker) {
        return NextResponse.json({ message: "Все данные обязательны!" }, { status: 400 });
    }

    try {
        await connectDB();

        const existingTitle = await Company.findOne({ title });
        if (existingTitle) {
            return NextResponse.json({ message: "Название должно быть уникальными!" }, { status: 400 });
        }


        const blob = await put(logo.name, logo, {
            access: "public",
            addRandomSuffix: true
        });



        await Company.create({
            title,
            imageUrl: blob.url,
            description,
            city,
            year,
            amountWorker
        });

        return NextResponse.json({ message: "Компания успешно добавлен" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ошибка создания компании" }, { status: 500 });
    }
}

