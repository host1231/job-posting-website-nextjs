"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import InputPassword from "@/components/InputPassword";
import { authFormSchema } from "@/lib/helper";


const SignIn = () => {
    const form = useForm({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values) {
        console.log(values)
        form.reset()
    }
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <div className="max-w-lg w-full shadow-md px-10 py-6">
                <h4 className="text-4xl font-bold mb-10 text-center text-amber-500">Xoş gəlmisən!</h4>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Şifrə</FormLabel>
                                    <FormControl>
                                        <InputPassword placeholder="Şifrə" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button size="xl" type="submit" className="w-full text-lg">Daxil ol</Button>
                        <p className="text-center">
                            Hesabın yoxdursa,
                            <Link href="/signup" className="text-amber-500 ml-1">
                                qeydiyyatdan keç
                            </Link>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default SignIn