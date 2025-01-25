import { z } from "zod";

const registerSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required." }),
      email: z
        .string({ required_error: "Email is required." })
        .email("Invalid email!"),
      password: z
        .string({ required_error: "Password is required." })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
          "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character.",
        ),
    })
    .strict(),
});

const loginSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: "Email is required." })
        .email("Invalid email!"),
      password: z.string({ required_error: "Password is required." }),
    })
    .strict(),
});

export const AuthValidations = { registerSchema, loginSchema };
