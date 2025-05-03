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
import { signupSchema } from "@/lib/helper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useState } from "react";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    async function onSubmit(values) {
        try {
            setIsLoading(true);
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message);
                router.push("/signin");
            } else {
                toast.error(data.message);
            }


            form.reset()
        } catch (error) {
            console.error(error);
            toast.error("Ошибка регистрации");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <div className="max-w-lg w-full shadow-md px-10 py-6">
                <h4 className="text-4xl font-bold mb-10 text-center text-amber-500">Yeni hesab yarat!</h4>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ad</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ad" {...field} />
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
                            Hesabın var?
                            <Link href="/signin" className="text-amber-500 ml-1">
                                Daxil ol
                            </Link>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default SignUp