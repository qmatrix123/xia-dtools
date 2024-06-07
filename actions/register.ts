"use server";

import * as z from "zod";
// import bcrypt from "bcryptjs";

// import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
// import { getUserByEmail } from "@/data/user";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  console.log(validatedFields.data)


  return { success: "Confirmation email sent!" };
};
