import '../styles/globals.css'

import { ChallengesProvider } from '../contexts/ChallengeContext'
import { CountdownProvider } from '../contexts/CountdownContext'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
        <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
