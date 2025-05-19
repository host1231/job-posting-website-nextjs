"use client"
import InputFile from '@/components/inputs/InputFile'
import Tiptap from '@/components/Tiptap'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { companySchema } from '@/lib/helper'
import { useAddCompanyMutation } from '@/services/vacancy'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const AddCompany = () => {
  const [AddCompany, {isLoading}] = useAddCompanyMutation();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      title: "",
      logo: null,
      description: "",
      city: "",
      year: "",
      amountWorker: "",
      site: ""
    },
  })

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.set("Title", values.title);
      formData.set("Logo", values.logo);
      formData.set("Description", values.description);
      formData.set("City", values.city);
      formData.set("Year", values.year);
      formData.set("AmountWorker", values.amountWorker);
      formData.set("Site", values.site);

      const result = await AddCompany(formData).unwrap();
      toast.success(result?.msg);
      router.push("/companies");
    } catch (error) {
      toast.error(error?.data?.msg);
    } finally {
      form.reset(); 
    }
  }


  return (
    <section className="py-5 md:py-10">
      <div className='container'>
        <Card className="max-w-[900px] mx-auto default-card bg-background">
          <CardHeader>
            <CardTitle>Добавьте информацию о компании</CardTitle>
            <CardDescription>Для добавление вакансии, сначала нужно добавить информацию о компании</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Названия компании</FormLabel>
                      <FormControl>
                        <Input placeholder="Kontakt Home" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-start gap-5">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-[40%]">
                        <FormLabel>Город</FormLabel>
                        <FormControl>
                          <Input placeholder="Баку" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem className="w-[30%]">
                        <FormLabel>Год появление компании</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amountWorker"
                    render={({ field }) => (
                      <FormItem className="w-[30%]">
                        <FormLabel>Количество сотрудников</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="21" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="site"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Веб сайт</FormLabel>
                      <FormControl>
                        <Input placeholder="Добавьте веб-сайт компании" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Краткое описание</FormLabel>
                      <FormControl>
                        {/* <Textarea className="resize-none h-30" placeholder="Добавьте описание компании" {...field} /> */}
                        <Tiptap value={field.name} onChange={field.onChange} />
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
                      <FormLabel>Логотип компании</FormLabel>
                      <FormControl>
                        <InputFile placeholder="Добавьте логотип компании" field={field} />
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

export default AddCompany