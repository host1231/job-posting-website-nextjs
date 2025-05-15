"use client"
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
import { signinSchema } from "@/lib/helper";
import { useState } from "react";
import {signIn} from "next-auth/react"
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import InputPassword from "@/components/inputs/InputPassword";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(values) {
        try {
            setIsLoading(true);
            const res = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false
            });
            
            if (res?.error) {
                toast.error(res.error);
            } else {
                toast.success("Успешный вход");
                // router.push("/");
                window.location.href = "/";
            }

        } catch (error) {
            console.error(error);
            toast.error("Ошибка авторизации");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <div className="max-w-lg w-full shadow-md px-5 md:px-10 py-6 border rounded-md my-10 bg-background">
                <h4 className="text-2xl md:text-4xl font-bold mb-10 text-center text-primary">Xoş gəlmisən!</h4>
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
                                        <InputPassword {...field} placeholder="Şifrə" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button size="xl" type="submit" className="w-full text-lg">
                            {
                                isLoading && <Loader className="animate-spin" />
                            }
                            Hesab yarat
                        </Button>
                        <p className="text-center">
                            Hesabın yoxdursa,
                            <Link href="/signup" className="text-primary ml-1">
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