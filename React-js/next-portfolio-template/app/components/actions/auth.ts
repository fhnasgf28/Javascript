"use server"

import { redirect } from "next/navigation"

export async function createUser(formData: FormData) {
  // Get form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validate form data
  if (!name || !email || !password || !confirmPassword) {
    return { error: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  try {
    // Here you would typically:
    // 1. Hash the password
    // 2. Store user in database
    // 3. Create a session

    // For demo purposes, we're just redirecting
    console.log("User created:", { name, email })

    // Redirect to login page after successful signup
    redirect("/login")
  } catch (error) {
    return { error: "Failed to create account" }
  }
}

export async function loginUser(formData: FormData) {
  // Get form data
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate form data
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    // Here you would typically:
    // 1. Verify credentials against database
    // 2. Create a session

    // For demo purposes, we're just redirecting
    console.log("User logged in:", { email })

    // Redirect to dashboard after successful login
    redirect("/dashboard")
  } catch (error) {
    return { error: "Invalid credentials" }
  }
}
