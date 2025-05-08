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
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      logo: null
    },
  })

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/category");
      const data = await res.json();
      setCategories(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCategory = async (e, id) => {
    try { 
      e.preventDefault();
      setIsLoading(true);
      const res = await fetch(`/api/category/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      
      getCategories();

      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка удаление категория!");
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(values) {
    try {
      setIsLoading(true);
      setOpen(false);

      const formData = new FormData();
      formData.set("Title", values.title);
      formData.set("Logo", values.logo);

      const res = await fetch("/api/category", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      
      getCategories();

      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      form.reset();
      console.log(res)
    } catch (error) {
      console.error(error);
      toast.error("Ошибка создание категория!");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    form.reset();
  }, [open]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-end mb-6 ">
          <h2 className="title">
            <span className="text-primary">Kateqoriyaları</span> kəşf et
          </h2>
          <Link href="/" className="hidden md:flex items-center gap-2 text-primary">
            <span>Bütün vakansiyalar</span>
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger >
              <Card className="w-full h-[207.6px] cursor-pointer">
                <CardContent className="flex justify-center items-center h-full text-neutral-300 hover:text-amber-500 ">
                  <BadgePlus size={70} />
                </CardContent>
              </Card>
              {/* <Button>Modal</Button> */}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Категория</DialogTitle>
                <DialogDescription>Добавьте категории</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Названия категория</FormLabel>
                        <FormControl>
                          <Input placeholder="Elm, Texnologiya və Mühəndislik" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Логотип категории</FormLabel>
                        <FormControl>
                          <InputFile open={open} placeholder="Добавьте логотип категории" field={field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="ml-auto w-full">Submit</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          {
            isLoading ?
              [...Array(8)].map((el, index) => <CategoryItemSkeleton key={index} />) :
              categories?.map(category => (
                <CategoryItem key={category._id} title={category.title} slug={category.slug} logo={category.imageUrl} vacanciesCount={category.vacanciesCount} onClick={(e) => deleteCategory(e, category._id)} />
              ))
          }

        </div>
      </div>
    </section>
  )
}

export default Categories