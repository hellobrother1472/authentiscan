import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuthentiScan",
  description: "Comprehensive Deepfake Detection System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl uppercase">AuthentiScan</Link>
            </div>
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                ></div>
              </div>
              {user && <UserButton />}
            </div>
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
