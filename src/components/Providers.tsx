"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SignedIn, SignedOut, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs"
import { Authenticated, AuthLoading, ConvexProvider, ConvexReactClient, Unauthenticated } from "convex/react"
import { ThemeProvider } from "./theme-provider"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import AuthorizeLoading from "@/app/Features/Auth/AuthorizeLoading"
import UnauthorizedView from "@/app/Features/Auth/UnAuthorizedView"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexProvider client={convex}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
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
          </header>
          <main>
            <Authenticated>

              {children}

            </Authenticated>

            <AuthLoading>
              <AuthorizeLoading />
            </AuthLoading>


            <Unauthenticated>
              <UnauthorizedView />
            </Unauthenticated>


          </main>
        </ConvexProviderWithClerk>
      </ConvexProvider>
    </ThemeProvider>
  )
}
