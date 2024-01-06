import '../styles/base.scss'

export const metadata = {
  title: 'Farm',
  description: 'The game of farming',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
