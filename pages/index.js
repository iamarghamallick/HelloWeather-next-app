import Head from 'next/head'
import Link from 'next/link'
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
      <div className='container d-flex justify-content-center align-items-center p-2' style={{ 'height': '100vh', 'width': '100vw', 'flexDirection': 'column' }}>
        <h1 className='text-center text-light'>Welcome to HelloWeather!</h1>
        <h4 className="text-center text-light mt-4 mb-4">Explore <Link href="/weather" style={{'textDecoration':'none'}}><button className='btn btn-dark'><h4 className='text-light'>weather</h4></button></Link> of your location</h4>
        <p className='text-center text-light'>API Source <a className='text-light' href="https://www.weatherapi.com/" target='_blank'>WeatherAPI.com</a></p>
      </div>
    </>
  )
}
