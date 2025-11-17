import './globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Volo - احجز فندقك في الجزائر',
  description: 'منصة حجز الفنادق الرائدة في الجزائر. اكتشف أفضل الفنادق.',
  keywords: 'حجز فنادق الجزائر، فنادق، Volo',
  openGraph: {
    title: 'Volo - احجز فندقك في الجزائر',
    description: 'منصة حجز الفنادق الرائدة في الجزائر',
    type: 'website',
    locale: 'ar_DZ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}