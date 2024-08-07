import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/hooks/useAuth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/ReactToastify.min.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>
        <AuthProvider>
          <div>
            <Navbar />
            <div>
              {children}
              <ToastContainer />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
