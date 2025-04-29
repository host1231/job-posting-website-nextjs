import { z } from "zod";

export const authFormSchema = z.object({
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