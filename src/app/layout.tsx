import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '../context/ThemeContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BiLearnHub - Open Learning Platform",
  description: "An open-learning platform where anyone can learn or teach. Join our community of learners and educators.",
  keywords: "LMS, Learning Management System, Education, Open Source, Online Learning, open-learning platform",
  authors: [{ name: "Biplov Gautam" }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.jpg', type: 'image/jpeg' }
    ],
    apple: '/logo.jpg',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "BiLearnHub - Open Source Learning Management System",
    description: "An open-source LMS where anyone can learn or teach",
    url: "https://bilearnhub.biplovgautam.com.np",
    siteName: "BiLearnHub",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
