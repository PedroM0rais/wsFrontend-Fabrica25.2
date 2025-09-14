import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pokédex Next.ts',
  description: 'Consumo da api Pokeapi.co',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  )
}
