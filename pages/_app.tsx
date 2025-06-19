import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={dmSans.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp 