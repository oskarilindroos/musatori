import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});
