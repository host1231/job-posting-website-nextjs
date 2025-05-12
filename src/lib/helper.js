import { z } from "zod";

export const vacancySchema = z.object({
  title: z.string()
    .min(1, "Название компании обязательно")
    .max(100, "Название слишком длинное"),
  categories: z.array(z.string()).min(1, {
    message: "Выберите хотя бы одну категорию",
  }),
  company: z.string().min(1, {
    message: "Выберите компанию"
  }),
  salary: z.string().optional(),
  type: z.string().min(1, {
    message: "Выберите тип вакансии"
  }),
  education: z.string().min(1, {
    message: "Выберите образование"
  }),
  experience: z.string().min(1, {
    message: "Выберите опыт работы"
  }),
  description: z
    .string()
    .min(10, "Описание слишком короткое"),
  requirements: z
    .string()
    .min(10, "Описание слишком короткое"),
  email: z.string()
    .email({ message: "Неверный формат почты" }),
})


export const companySchema = z.object({
  title: z
    .string()
    .min(1, "Название компании обязательно")
    .max(100, "Название слишком длинное"),
  description: z
    .string()
    .min(10, "Описание слишком короткое")
    .max(1000, "Описание слишком длинное"),
  logo: z
    .any()
    .refine(file => file instanceof File || file === undefined, {
      message: "Необходимо загрузить логотипа"
    }),
  city: z
    .string()
    .min(1, "Город обязателен")
    .max(50, "Название города слишком длинное"),
  year: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Год должен быть числом" })
    .refine((val) => val >= 1800 && val <= new Date().getFullYear(), {
      message: "Год должен быть в допустимом диапазоне",
    }),
  amountWorker: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Кол-во сотрудников должен быть числом" })
    .refine((val) => val >= 1 && val <= 100000, {
      message: "Сотрудники должен быть в допустимом диапазоне",
    }),
  site: z
    .string()
    .url()
    .optional()
    .or(z.literal(""))
});

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Ad ən azı 3 simvol uzunluğunda olmalıdır" })
    .max(20, { message: "Ad 20 simvoldan çox olmamalıdır" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "İstifadəçi adında yalnız hərflər, rəqəmlər və alt xətt ola bilər.",
    }),

  email: z
    .string()
    .email({ message: "Yanlış email formatı" }),

  password: z
    .string()
    .min(8, { message: "Şifrə ən azı 8 simvol uzunluğunda olmalıdır" })
    .max(64, { message: "Şifrə 64 simvoldan çox olmamalıdır" })
    .regex(/[a-z]/, { message: "Şifrədə ən azı bir kiçik hərf olmalıdır" })
    .regex(/[A-Z]/, { message: "Şifrədə ən azı bir böyük hərf olmalıdır" })
    .regex(/[0-9]/, { message: "Şifrə ən azı bir rəqəmdən ibarət olmalıdır" })
    .regex(/[^a-zA-Z0-9]/, { message: "Şifrədə ən azı bir xüsusi simvol olmalıdır" }),
});

export const signinSchema = z.object({
  email: z
    .string()
    .email({ message: "Yanlış email formatı" }),

  password: z
    .string()
    .min(8, { message: "Şifrə ən azı 8 simvol uzunluğunda olmalıdır" })
    .max(64, { message: "Şifrə 64 simvoldan çox olmamalıdır" })
    .regex(/[a-z]/, { message: "Şifrədə ən azı bir kiçik hərf olmalıdır" })
    .regex(/[A-Z]/, { message: "Şifrədə ən azı bir böyük hərf olmalıdır" })
    .regex(/[0-9]/, { message: "Şifrə ən azı bir rəqəmdən ibarət olmalıdır" })
    .regex(/[^a-zA-Z0-9]/, { message: "Şifrədə ən azı bir xüsusi simvol olmalıdır" }),
});

