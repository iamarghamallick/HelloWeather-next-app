import Head from 'next/head'
import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faWind } from '@fortawesome/free-solid-svg-icons'

const weather = () => {
    const API_KEY = "c4910bb187874a6893f170604232603"
    let baseUrl = "https://api.weatherapi.com/v1/forecast.json?key="+API_KEY+"&q="

    const [query, setQuery] = useState("Kolkata")
    const [weather, setWeather] = useState("")
    const [london, setLondon] = useState("")
    const [kolkata, setKolkata] = useState("")
    const [newyork, setNewyork] = useState("")

    const fetchWeather = async (query) => {
        let weather = await fetch(baseUrl + query)
        let response = await weather.json()
        return response
    }
    useEffect(() => {
        async function fetchData() {
            let london = await fetchWeather("London")
            setLondon(london)
            let kolkata = await fetchWeather("Kolkata")
            setKolkata(kolkata)
            let newyork = await fetchWeather("New York")
            setNewyork(newyork)
        }
        async function fetchLastWeather() {
            let weather = await fetch(baseUrl + localStorage.getItem('userLocation'))
            let response = await weather.json()
            setWeather(response)
        }
        localStorage.getItem('userLocation') && fetchLastWeather();
        fetchData();
    }, [])

    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    const handleClick = async () => {
        let w = await fetchWeather(query)
        setWeather(w)
        localStorage.setItem('userLocation', query)
    }
    return (
        <>
            <Head>
                <title>HelloWeather - Get Weather Updates Around The Globe</title>
                <meta name="description" content="Weather App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <div style={{ 'minHeight': '100vh' }}>
                <div className="container">
                    <div className="input-group mb-6 mt-3">
                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faLocationDot} /></span>
                        <input type="text" className="form-control" placeholder="Your location" aria-label="Location" aria-describedby="basic-addon1" style={{ "background": "white" }} onChange={handleChange} />
                        <button className="btn btn-primary mx-2 border border-rounded" aria-current="page" onClick={handleClick} >Search</button>
                    </div>

                    {weather && <div className="weather-container my-3 rounded" >
                        <div className="weather-location text-light rounded bg-dark px-3 py-1">{weather.location.name}, {weather.location.region}, {weather.location.country} as on {weather.current.last_updated}</div>
                        <div className="weather-headline d-flex justify-content-between align-items-center">
                            <div className="weather-headline-left px-3">
                                <h1 className="temp text-light">{weather.current.temp_c} &#8451;</h1>
                                <p className="condition text-light">{weather.current.condition.text}</p>
                                <p className="high-low-temp text-light">Day {weather.forecast.forecastday[0].day.maxtemp_c} &#8451; | Night {weather.forecast.forecastday[0].day.mintemp_c} &#8451;</p>
                            </div>
                            <div className="weather-headline-right px-3 align-items-center">
                                {/* <FontAwesomeIcon icon={faWind} className='fa-3x text-light' /> */}
                                {<img src={weather.current.condition.icon} alt="weather icon" />}
                            </div>
                        </div>
                    </div>}

                    <h2 className="heading text-light text-center m-4">Top Locations Around The Globe</h2>

                    <div className="top-locations-container mb-3">
                        {london && <div className="card top-location-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/London_Eye_-_tunliweb.no.JPG/1024px-London_Eye_-_tunliweb.no.JPG" className="card-img-top" alt="London" />
                            <div className="card-body bg-dark text-light">
                                <h5 className="card-title">London</h5>
                                <h1 className="card-temp">{london.current.temp_c} &#8451;</h1>
                                <p className="card-text">{london.current.condition.text}</p>
                            </div>
                        </div>}
                        {kolkata && <div className="card top-location-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ketan_donate4.jpg/1200px-Ketan_donate4.jpg" className="card-img-top" alt="Kolkata" />
                            <div className="card-body bg-dark text-light">
                                <h5 className="card-title">Kolkata</h5>
                                <h1 className="card-temp">{kolkata.current.temp_c} &#8451;</h1>
                                <p className="card-text">{kolkata.current.condition.text}</p>
                            </div>
                        </div>}
                        {newyork && <div className="card top-location-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Usa-world-trade-center-skyscrapers-reflection-night-skyline-cityscape.jpg/360px-Usa-world-trade-center-skyscrapers-reflection-night-skyline-cityscape.jpg" className="card-img-top" alt="New York" />
                            <div className="card-body bg-dark text-light">
                                <h5 className="card-title">New York</h5>
                                <h1 className="card-temp">{newyork.current.temp_c} &#8451;</h1>
                                <p className="card-text">{newyork.current.condition.text}</p>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default weather