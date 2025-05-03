"use client"
import InputFile from '@/components/InputFile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { useForm } from 'react-hook-form'

const MyCompany = () => {
  const form = useForm();

  return (
    <section className="py-10 bg-neutral-50">
      <div className='container'>
        <Card className="w-[800px] mx-auto default-card">
          <CardHeader>
            <CardTitle>Добавьте информацию о компании</CardTitle>
            <CardDescription>Для добавление вакансии, сначала нужно добавить информацию о компании</CardDescription>
          </CardHeader>
          <CardContent>
            <Form>
              <form>
                {/* <FormField
                  control={form.control} 
                  name="Title"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Название компании</FormLabel>
                      <FormControl>
                        <Input placeholder="Kontakt Home" />
                      </FormControl>
                    </FormItem>
                  )}
                /> */}
                <Input className="mb-5" placeholder="Kontakt Home" />
                <InputFile />
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input placeholder="e-Mail" />
                <Input placeholder="Telefon" />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default MyCompany