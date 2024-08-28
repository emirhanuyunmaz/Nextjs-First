'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import { UserListPageContextProvider } from "../context/userListPageContext";
import { Toaster } from "../components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <UserListPageContextProvider>
              <Navbar/>
              {children}
              <Toaster />
            </UserListPageContextProvider>
      </body>
    </html>
  );
}
