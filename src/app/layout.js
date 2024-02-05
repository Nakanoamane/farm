import 'the-new-css-reset/css/reset.css';
import '../styles/base.scss';
import { basePath } from '../../next.config'

export const metadata = {
  title: 'Farm',
  description: 'The game of farming',
  metadataBase: new URL(basePath ? basePath : 'http://localhost:3000'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
