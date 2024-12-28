import { Navbar } from "@/components/Navbar";
import { AppProvider } from "@/context/AppContext";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import logo from "../../public/logo.png";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Wordland - Seu dicionário de palavras em inglês</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-teal-100 font-mono`}
      >
        <AppProvider>
          <link rel="icon" href="./favicon.ico" />
          <header>
            <Navbar />
            <div className="flex flex-col justify-center items-center my-8">
              <div className="w-full md:w-3/4 lg:w-2/3 px-8">
                <div className="flex justify-between">
                  <Image src={logo} width={50} height={50} alt="Logo" />
                </div>
                <h1 className="text-3xl font-bold mb-4 mt-4">Wordland</h1>
                <h2>Seu dicionário de palavras em inglês</h2>
              </div>
            </div>
          </header>
          <div className="flex justify-center ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-2/3 mb-8">
              {children}
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
