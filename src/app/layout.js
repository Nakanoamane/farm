import 'the-new-css-reset/css/reset.css';
import '../styles/base.scss';

export const metadata = {
  title: 'Farm',
  description: 'The game of farming',
  metadataBase: new URL('https://nakanoamane.github.io/'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
