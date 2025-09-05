import "./globals.css";
import { Outfit } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: "MockMate",
  description: "AI powered Interview Simulator",
  icons: {
    icon: "/logo.png",   
    shortcut: "/logo.png", 
  },
};

const outfit = Outfit({subsets: ['latin']})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
