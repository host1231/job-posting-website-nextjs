"use client"

import CategoryItem from '@/components/CategoryItem'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ArrowBigRightDash, ArrowRight, BadgePlus, Plus, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import InputFile from '@/components/InputFile'
import Link from 'next/link'
import CategoryItemSkeleton from '@/components/CategoryItemSkeleton'
import { toast } from 'sonner'
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery } from '@/services/vacancy'
import AddCategory from '@/components/AddCategory'
import { useSession } from 'next-auth/react'

const formSchema = z.object({
  title: z.string().min(2).max(50),
  logo: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, {
      message: "Логотип обязателен",
    }),
});


const Categories = () => {
  const [open, setOpen] = useState(false);
  const {data: session} = useSession();
  
  const { data: categories, error, isLoading, isFetching } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      logo: null
    },
  })

  const handleDelete = async (e, slug) => {
    try { 
      e.preventDefault();

      const result = await deleteCategory(slug).unwrap();
      toast.success(result?.msg);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.msg);
    } 
  }

  async function onSubmit(values) {
    try {
      setOpen(false);

      const formData = new FormData();
      formData.set("Title", values.title);
      formData.set("Logo", values.logo);

      const result = await addCategory(formData).unwrap();
      toast.success(result?.msg);

    } catch (error) {
      toast.error(error?.data?.msg);
    }
    finally {
      form.reset();
    }
  }

  useEffect(() => {
    form.reset();
  }, [open]);

  return (
    <section className="py-5 md:py-10">
      <div className="container">
        <div className="flex justify-between items-end mb-6">
          <h2 className="title">
            <span className="text-primary">Kateqoriyaları</span> kəşf et
          </h2>
          <Link href="/" className="hidden md:flex items-center gap-2 text-primary">
            <span>Bütün vakansiyalar</span>
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            session?.user?.role === "admin" && (
              <AddCategory open={open} setOpen={setOpen} form={form} onSubmit={onSubmit} />
            )
          }
          {(isLoading || isFetching) && [...Array(8)].map((el, index) => <CategoryItemSkeleton key={index} />)}
          {
              categories?.map(category => (
                <CategoryItem key={category._id} id={category._id} title={category.title} slug={category.slug} logo={category.imageUrl} vacanciesCount={category.vacanciesCount} onClick={(e) => handleDelete(e, category.slug)} />
              ))
          }

        </div>
      </div>
    </section>
  )
}

export default Categories