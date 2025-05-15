import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Card, CardContent } from './ui/card'
import { BadgePlus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Button } from './ui/button'
import InputFile from './inputs/InputFile'
import { Input } from './ui/input'

const AddCategory = ({ open, setOpen, form, onSubmit }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Card className="w-full h-[207.6px] cursor-pointer">
                    <CardContent className="flex justify-center items-center h-full text-neutral-300 hover:text-primary ">
                        <BadgePlus size={70} />
                    </CardContent>
                </Card>
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
    )
}

export default AddCategory