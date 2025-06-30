import React from 'react'
import './styles/global.css'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

export const metadata = {
  description: 'Expert motion graphics designer with 6+ years experience specializing in 2D/3D animation, visual effects, and kinetic typography. Transform your brand with dynamic visual storytelling.',
  title: 'Debajit Dey - Motion Graphics Designer | 6+ Years Experience',
  keywords: 'motion graphics designer, 2D animation, 3D animation, visual effects, kinetic typography, brand animation, motion design, video production, after effects',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
