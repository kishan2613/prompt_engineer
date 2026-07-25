import { supabase } from "../lib/supabase";

/**
 * Check whether the email exists in the users table.
 */
export async function loginWithEmail(email) {
  const { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("email", email)
  .maybeSingle();

if (error) throw error;

if (!data) {
  console.log("User not found");
}

  if (error || !data) {
    return {
      success: false,
      message: "Access denied. Contact the administrator.",
    };
  }

  localStorage.setItem("user", JSON.stringify(data));

  return {
    success: true,
    user: data,
  };
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
}

export function logout() {
  localStorage.removeItem("user");
}