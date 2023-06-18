import Head from 'next/head'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>HelloWeather - Get Weather Updates Around The Globe</title>
        <meta name="description" content="Weather App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className='main' style={{ 'height': '100vh' }}>
        <Popup trigger={<button> Click to open popup </button>}
          modal
          nested
        >
          <div>HelloWeather</div>
        </Popup>
      </main>
    </>
  )
}
