"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SignedIn, SignedOut, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>



    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexProvider client={convex}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>

          <header className="flex justify-end items-center p-4 gap-4 h-16">
            {/* Show the sign-in and sign-up buttons when the user is signed out */}
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {children}
          </header>
        </ConvexProviderWithClerk>

      </ConvexProvider>
    </ThemeProvider>


  </NextThemesProvider>
}
