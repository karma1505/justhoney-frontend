import type { Metadata } from 'next'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'JustHoney - Pure Organic Honey from Pune',
  description: 'Discover 100% natural, organic honey varieties straight from the heart of India.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="transition-theme duration-theme">
      <body className="min-h-screen bg-light dark:bg-dark transition-theme duration-theme">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}