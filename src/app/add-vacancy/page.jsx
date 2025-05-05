"use client"
import CustomSelect from '@/components/CustomSelect'
import DropdownMenuCheckbox from '@/components/DropdownMenuCheckbox'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { vacancySchema } from '@/lib/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'



const types = [
    {
        _id: 1, value: "Full-time", title: "Tam ştat"
    },
    {
        _id: 2, value: "Part-time", title: "Yarım-ştat"
    },
    {
        _id: 3, value: "Freelance", title: "Frilans"
    },
    {
        _id: 4, value: "Intern", title: "Təcrübəçi"
    },
    {
        _id: 5, value: "Remote", title: "Uzaqdan"
    },
    {
        _id: 6, value: "Temporary", title: "Müvəqqəti iş"
    },
];

const education = [
    {
        _id: 1, value: "High", title: "Ali"
    },
    {
        _id: 2, value: "Partial high", title: "Natamam ali"
    },
    {
        _id: 3, value: "Medium", title: "Orta"
    },
];

const experience = [
    {
        _id: 1, value: "No experience", title: "Təcrubəsiz"
    },
    {
        _id: 2, value: "1-3 years", title: "1 ildən 3 ilə qədər"
    },
    {
        _id: 3, value: "3-5 years", title: "3 ildən 5 ilə qədər"
    },
    {
        _id: 4, value: "5+ years", title: "5 ildən yüksək"
    },
];

const AddVacancy = () => {
    const [categories, setCategories] = useState([]);
    const [companies, setCompanies] = useState([]);

    const [isLoading, setIsLoading] = useState(false);


    const form = useForm({
        resolver: zodResolver(vacancySchema),
        defaultValues: {
            title: "",
            categories: [],
            company: "",
            salary: "",
            type: "",
            education: "",
            experience: "",
            description: "",
            requirements: "",
            email: ""
        },
    })

    async function onSubmit(values) {
        try {
            setIsLoading(true);
            const res = await fetch("/api/vacancy", {
                method: "POST",
                body: JSON.stringify(values)
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.msg);
            } else {
                toast.error(data.msg);
            }

        } catch (error) {
            console.error(error);
            toast.error("Ошибка добавление вакансии!");
        } finally {
            setIsLoading(false);
            form.reset();
        }
    }

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch("/api/category");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        }

        const getCompanies = async () => {
            try {
                const res = await fetch("/api/company");
                const data = await res.json();
                setCompanies(data);
            } catch (error) {
                console.error(error);
            }
        }

        getCategories();
        getCompanies();
    }, []);

    return (
        <section className="py-10">
            <div className="container">
                <Card className="default-card max-w-[1100px] mx-auto">
                    <CardHeader>
                        <CardTitle>Добавление вакансии</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (<FormItem className="w-full">
                                        <FormLabel>Компания</FormLabel>
                                        <FormControl>
                                            <CustomSelect placeholder="Выберите компанию" data={companies} value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)
                                    }
                                />
                                <div className="flex items-start gap-5 ">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Должность</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Добавьте название должности" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="categories"
                                        rules={{ required: 'Выберите хотя бы одну категорию' }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Категория</FormLabel>
                                                <FormControl>
                                                    <DropdownMenuCheckbox
                                                        data={categories}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        title="Выберите категорию"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex items-start gap-5 ">
                                    <FormField
                                        control={form.control}
                                        name="salary"
                                        render={({ field }) => (
                                            <FormItem className="w-[25%]">
                                                <FormLabel>Зарплата</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="200" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        rules={{ required: 'Выберите хотя бы одну из типов' }}
                                        render={({ field }) => (
                                            <FormItem className="w-[25%]">
                                                <FormLabel>Тип</FormLabel>
                                                <FormControl>
                                                    <CustomSelect placeholder={"Выберите тип вакансии"} data={types} value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="education"
                                        render={({ field }) => (
                                            <FormItem className="w-[25%]">
                                                <FormLabel>Образование</FormLabel>
                                                <FormControl>
                                                    <CustomSelect placeholder="Выберите образование" data={education} value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="experience"
                                        render={({ field }) => (
                                            <FormItem className="w-[25%]">
                                                <FormLabel>Опыт работы</FormLabel>
                                                <FormControl>
                                                    <CustomSelect placeholder="Выберите опыт работы" data={experience} value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Описание</FormLabel>
                                            <FormControl>
                                                <Textarea className="resize-none h-30" placeholder="Добавьте описание вакансии" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="requirements"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Требование</FormLabel>
                                            <FormControl>
                                                <Textarea className="resize-none h-30" placeholder="Добавьте требование вакансии" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>E-mail</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Добавьте почту для обратной связи" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" size="xl" className="ml-auto w-full">
                                    {
                                        isLoading && <Loader className='animate-spin' />
                                    }
                                    Submit
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default AddVacancy