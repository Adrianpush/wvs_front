import './globals.css'
import { Inter } from 'next/font/google'
import { Footer, Nav } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <div className='bg-slate-400 2xl'>
        <Nav/>

        {children}

        <Footer/>
        </div>
        </body>
    </html>
  )
}
