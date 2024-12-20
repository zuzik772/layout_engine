"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import { encodedRedirect } from "../../utils/utils";
import { revalidatePath } from "next/cache";

export const signUpAction = async (formData: FormData) => {
  const supabase = createClient();
  const origin = headers().get("origin");
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/sign-in`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect("success", "/sign-up", "Thanks for signing up! Please check your email for a verification link.");
  }
};

export const signInAction = async (formData: FormData) => {
  console.log("formData", formData);
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  console.log("error", error);
  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }
  revalidatePath("/protected", "layout");
  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect("error", "/forgot-password", "Could not reset password");
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect("success", "/forgot-password", "Check your email for a link to reset your password.");
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect("error", "/protected/reset-password", "Password and confirm password are required");
  }

  if (password !== confirmPassword) {
    encodedRedirect("error", "/protected/reset-password", "Passwords do not match");
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect("error", "/protected/reset-password", "Password update failed");
  }

  redirect("/protected/reset-password");
};

export const signOutAction = async () => {
  const supabase = createClient();
  try {
    await supabase.auth.signOut();
    return redirect("/sign-in");
  } catch (error) {
    console.error("Error signing out:", error);
    return redirect("/error");
  }
};
