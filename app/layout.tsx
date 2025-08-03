import type { Metadata } from 'next'
import Navbar from './components/layout/navbar'
import Footer from './components/layout/footer'
import './globals.css'
import { Montserrat } from 'next/font/google'

export const metadata: Metadata = {
  title: 'JustHoney - Pure Organic Honey from Pune',
  description: 'Discover 100% natural, organic honey varieties straight from the heart of India.',
}

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '600', '700'] // Regular, Semi-bold, Bold
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`transition-theme duration-theme ${montserrat.variable}`}>
      <body className="min-h-screen bg-light dark:bg-dark font-montserrat transition-theme duration-theme flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}