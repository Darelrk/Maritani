
"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
    callbackUrl: string | undefined,
    formData: FormData
): Promise<void> {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: callbackUrl || "/",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            // Handle auth error without returning value
            console.error("Authentication error:", error.type);
            throw error;
        }
        throw error;
    }
}

export async function handleLogout() {
    await signOut({ redirectTo: "/" });
}
