import '../styles/globals.css'
import {Providerctx} from '../components/Home'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/js/dist/dropdown'

function MyApp({ Component, pageProps }) {
  return <Providerctx>
          <Component {...pageProps} />
        </Providerctx>
}

export default MyApp



