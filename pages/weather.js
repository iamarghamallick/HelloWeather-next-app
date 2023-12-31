import Head from 'next/head'
import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faWind, faCloudRain, faTemperatureHalf, faDroplet, faArrowsToDot, faEye, faSun, faMoon, faCloudSun, faUpload, faDownload, faCloud, faUmbrella, faC, faCross, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Popup from 'reactjs-popup'
import Loader from '@/components/Loader'

const weather = () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY
    let baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=" + API_KEY + "&q="

    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("Kolkata")
    const [weather, setWeather] = useState("")
    const [london, setLondon] = useState("")
    const [kolkata, setKolkata] = useState("")
    const [newyork, setNewyork] = useState("")
    const [errorInWeather, setErrorInWeather] = useState("")

    const fetchWeather = async (query) => {
        try {
            let weather = await fetch(baseUrl + query)
            let response = await weather.json()
            return response
        } catch (err) {
            console.log(err);
        }

    }

    const [open, setOpen] = useState(false);
    const closeModal = () => {
        console.log("close modal")
        setOpen(false)
    };

    useEffect(() => {
        async function fetchData() {
            let london = await fetchWeather("London")
            setLondon(london)
            let kolkata = await fetchWeather("Kolkata")
            setKolkata(kolkata)
            let newyork = await fetchWeather("New York")
            setNewyork(newyork)
            setLoading(false);
        }
        async function fetchLastWeather() {
            try {
                let weather = await fetch(baseUrl + localStorage.getItem('userLocation'))
                let response = await weather.json()
                setWeather(response)
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        setLoading(true);
        localStorage.getItem('userLocation') && fetchLastWeather();
        fetchData();
    }, [])

    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    const handleClick = async () => {
        setLoading(true);
        let w = await fetchWeather(query)
        if (!w.error) {
            setWeather(w)
            setLoading(false);
            setErrorInWeather(undefined)
            localStorage.setItem('userLocation', query)
        } else {
            setErrorInWeather(w)
            setLoading(false);
        }
    }
    return (
        <>
            <Head>
                <title>HelloWeather - Get Weather Updates Around The Globe</title>
                <meta name="description" content="Weather App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <div className='weather-js-container' style={{ 'minHeight': '100vh' }}>
                <div className="container">
                    <div className="input-group mb-6 mt-3">
                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faLocationDot} style={{ 'color': '#0d6efd' }} /></span>
                        <input type="text" className="form-control" placeholder="Your location" aria-label="Location" aria-describedby="basic-addon1" style={{ "background": "white" }} onChange={handleChange} />
                        <button className="btn btn-primary mx-2 border border-rounded" aria-current="page" onClick={handleClick} >Search</button>
                    </div>
                    {(errorInWeather || loading) && <div className="error-loading-container m-2" style={{'height':'40px'}}>
                        {errorInWeather && <div className="error-message text-center text-light">Sorry! {errorInWeather.error.message}</div>}
                        {loading && <Loader />}
                    </div>}



                    {weather && <div className="weather-container my-3 rounded" >
                        {/* weather headline  */}
                        <div className="weather-location text-light rounded bg-dark px-3 py-1">{weather.location.name}, {weather.location.region}, {weather.location.country} as on {weather.current.last_updated}</div>
                        <div className="weather-headline d-flex justify-content-between align-items-center">
                            <div className="weather-headline-left px-3">
                                <h1 className="temp text-light">{weather.current.temp_c} &#8451;</h1>
                                <p className="condition text-light">{weather.current.condition.text}</p>
                                <p className="high-low-temp text-light">Day {weather.forecast.forecastday[0].day.maxtemp_c} &#8451; <br /> Night {weather.forecast.forecastday[0].day.mintemp_c} &#8451;</p>
                            </div>
                            <div className="weather-headline-right px-3 align-items-center">
                                {/* <FontAwesomeIcon icon={faWind} className='fa-3x text-light' /> */}
                                {<img src={weather.current.condition.icon} alt="weather icon" />}
                            </div>
                        </div>

                        {/* today's quick forecast  */}
                        <div className="weather-location text-light rounded bg-dark px-3 py-1">Today's forecast for {weather.location.name}, {weather.location.region}</div>
                        <h4 className="weather-location text-center text-light rounded px-3 py-1">{weather.forecast.forecastday[0].day.condition.text}</h4>
                        <div className="quick-forecast-container">
                            <div className="quick-forecast-box">
                                <h6 className="timing">Morning</h6>
                                <h1 className="temp">{weather.forecast.forecastday[0].hour[6].temp_c} &#8451;</h1>
                                <img src={weather.forecast.forecastday[0].hour[6].condition.icon} alt="weather icon" />
                                {/* <div className="raining d-flex justify-content-center align-items-center mt-1">
                                    <FontAwesomeIcon icon={faCloudRain} className='text-light' />
                                    <p className='m-0 mx-2'>{weather.forecast.forecastday[0].hour[6].chance_of_rain} &#x25;</p>
                                </div> */}
                            </div>
                            <div className="quick-forecast-box">
                                <h6 className="timing">Afternoon</h6>
                                <h1 className="temp">{weather.forecast.forecastday[0].hour[12].temp_c} &#8451;</h1>
                                <img src={weather.forecast.forecastday[0].hour[12].condition.icon} alt="weather icon" />
                                {/* <div className="raining d-flex justify-content-center align-items-center mt-1">
                                    <FontAwesomeIcon icon={faCloudRain} className='text-light' />
                                    <p className='m-0 mx-2'>{weather.forecast.forecastday[0].hour[12].chance_of_rain} &#x25;</p>
                                </div> */}
                            </div>
                            <div className="quick-forecast-box">
                                <h6 className="timing">Evening</h6>
                                <h1 className="temp">{weather.forecast.forecastday[0].hour[19].temp_c} &#8451;</h1>
                                <img src={weather.forecast.forecastday[0].hour[19].condition.icon} alt="weather icon" />
                                {/* <div className="raining d-flex justify-content-center align-items-center mt-1">
                                    <FontAwesomeIcon icon={faCloudRain} className='text-light' />
                                    <p className='m-0 mx-2'>{weather.forecast.forecastday[0].hour[19].chance_of_rain} &#x25;</p>
                                </div> */}
                            </div>
                            <div className="quick-forecast-box">
                                <h6 className="timing">Overnight</h6>
                                <h1 className="temp">{weather.forecast.forecastday[0].hour[0].temp_c} &#8451;</h1>
                                <img src={weather.forecast.forecastday[0].hour[0].condition.icon} alt="weather icon" />
                                {/* <div className="raining d-flex justify-content-center align-items-center mt-1">
                                    <FontAwesomeIcon icon={faCloudRain} className='text-light' />
                                    <p className='m-0 mx-2'>{weather.forecast.forecastday[0].hour[0].chance_of_rain} &#x25;</p>
                                </div> */}
                            </div>
                        </div>

                        {/* weather details - today */}
                        <div className="weather-location text-light rounded bg-dark px-3 py-1">Weather Today in {weather.location.name}, {weather.location.region}</div>
                        <div className="current-weather-details-container">
                            <div className="current-weather-details-container-left">
                                <div className="feels-like-temp">
                                    <h1>{weather.current.feelslike_c} &#8451;</h1>
                                    <p className='text-center'>Feels Like</p>
                                </div>
                                <div className="current-details-box">
                                    <div className="current-details-box-left"><FontAwesomeIcon icon={faTemperatureHalf} className='text-light' /> High / Low</div>
                                    <div className="current-details-box-right">{weather.forecast.forecastday[0].day.maxtemp_c}&deg; / {weather.forecast.forecastday[0].day.mintemp_c}&deg;</div>
                                </div>
                                <div className="current-details-box">
                                    <div className="current-details-box-left"><FontAwesomeIcon icon={faDroplet} className='text-light' /> Humidity</div>
                                    <div className="current-details-box-right">{weather.current.humidity} &#x25;</div>
                                </div>
                                <div className="current-details-box">
                                    <div className="current-details-box-left"><FontAwesomeIcon icon={faArrowsToDot} className='text-light' /> Pressure</div>
                                    <div className="current-details-box-right">{weather.current.pressure_mb} mb</div>
                                </div>
                                <div className="current-details-box">
                                    <div className="current-details-box-left"><FontAwesomeIcon icon={faEye} className='text-light' /> Visibility</div>
                                    <div className="current-details-box-right">{weather.current.vis_km} km</div>
                                </div>
                            </div>
                            <div className="current-weather-details-container-right">
                                <div className="sunrise-set">
                                    <span className=''><FontAwesomeIcon icon={faSun} className='fa-3x text-light' /></span>
                                    <p className='text-center'><FontAwesomeIcon icon={faUpload} className='text-light' /> {weather.forecast.forecastday[0].astro.sunrise} &nbsp; &nbsp; <FontAwesomeIcon icon={faDownload} className='text-light' /> {weather.forecast.forecastday[0].astro.sunset}</p>
                                </div>
                                <div className="current-details-box">
                                    <div className="current-details-box-left"><FontAwesomeIcon icon={faWind} className='text-light' /> Wind</div>
                                    <div className="current-details-box-right">{weather.current.wind_dir} {weather.current.wind_kph} km/h</div>
                                </div>
                                <div className="current-details-box">
                                    <div className="current-details-box-left"><FontAwesomeIcon icon={faCloud} className='text-light' /> Cloud Cover</div>
                                    <div className="current-details-box-right">{weather.current.cloud}&#x25;</div>
                                </div>
                                <div className="current-details-box">
                                    <div className="current-details-box-left"><FontAwesomeIcon icon={faSun} className='text-light' /> UV Index</div>
                                    <div className="current-details-box-right">{weather.current.uv} of 10</div>
                                </div>
                                <div className="current-details-box">
                                    <div className="current-details-box-left"><FontAwesomeIcon icon={faMoon} className='text-light' /> Moon Phase</div>
                                    <div className="current-details-box-right">{weather.forecast.forecastday[0].astro.moon_phase}</div>
                                </div>
                            </div>
                        </div>

                        {/* hourly forecast  */}
                        <div className="weather-location text-light rounded bg-dark px-3 py-1">Today's Hourly forecast for {weather.location.name}, {weather.location.region}</div>
                        {/* <div className="hourly-forecast-container p-2">
                            {weather.forecast.forecastday[0].hour.map((item) => {
                                return <Popup key={item.time_epoch} trigger={<div className="hourly-forecast-box toggle" key={item.time_epoch}>
                                    <h6 className="timing">{item.time.slice(10, 16)}</h6>
                                    <h5 className="temp">{item.temp_c} &#8451;</h5>
                                    <img src={item.condition.icon} alt="weather icon" />
                                    <div className="raining d-flex justify-content-center align-items-center mt-1">
                                        <FontAwesomeIcon icon={faDroplet} className='text-light' />
                                        <p className='m-0 mx-2'>{item.humidity} </p>
                                        <FontAwesomeIcon icon={faUmbrella} className='text-light' />
                                        <p className='m-0 mx-2'> {item.chance_of_rain}&#x25;</p>
                                    </div>
                                </div>}
                                    position="center center">
                                    <div className='text-light bg-dark' style={{ "width": "50vw" }}>GeeksforGeeks</div>
                                </Popup>
                            })}


                        </div> */}

                        <div className="hourly-forecast-container p-2">
                            {weather.forecast.forecastday[0].hour.map((item) => {
                                return <Popup open={open} closeOnDocumentClick onClose={closeModal} key={item.time_epoch}
                                    trigger={
                                        <div onClick={() => setOpen(true)} className="hourly-forecast-box toggle" key={item.time_epoch}>
                                            <h6 className="timing">{item.time.slice(10, 16)}</h6>
                                            <h5 className="temp">{item.temp_c} &#8451;</h5>
                                            <img src={item.condition.icon} alt="weather icon" />
                                            <div className="raining d-flex justify-content-center align-items-center mt-1">
                                                <FontAwesomeIcon icon={faDroplet} className='text-light' />
                                                <p className='m-0 mx-2'>{item.humidity} </p>
                                                <FontAwesomeIcon icon={faUmbrella} className='text-light' />
                                                <p className='m-0 mx-2'> {item.chance_of_rain}&#x25;</p>
                                            </div>
                                        </div>
                                    }
                                    modal
                                    nested
                                >
                                    {close => (<div className="modal-container">
                                        <div className="modal-title">{item.time}</div>
                                        <div className="modal-body">
                                            <h1 className="temp">{item.feelslike_c} &#8451;</h1>
                                            <p className="condition-text">Real Feel</p>
                                            <img src={item.condition.icon} alt="weather icon" />
                                            <p className="condition-text">{item.condition.text}</p>
                                            <div className="hourly-weather-details-container">
                                                <div className="hourly-details-box">
                                                    <FontAwesomeIcon icon={faWind} className='text-light' /> {item.wind_dir} {item.wind_kph} km/h
                                                </div>
                                                <div className="hourly-details-box">
                                                    <FontAwesomeIcon icon={faArrowsToDot} className='text-light' /> {item.pressure_mb} mb
                                                </div>
                                                <div className="hourly-details-box">
                                                    <FontAwesomeIcon icon={faCloud} className='text-light' /> {item.cloud} &#x25;
                                                </div>
                                                <div className="hourly-details-box">
                                                    <FontAwesomeIcon icon={faSun} className='text-light' /> {item.uv}/10
                                                </div>
                                                <div className="hourly-details-box">
                                                    <FontAwesomeIcon icon={faEye} className='text-light' /> {item.vis_km} km
                                                </div>
                                                <div className="hourly-details-box">
                                                    <FontAwesomeIcon icon={faDroplet} className='text-light' />&deg; {item.dewpoint_c} &#8451;
                                                </div>
                                            </div>
                                            <div className="h-bar">____________</div>
                                            <button onClick={() => { close(); }} className='btn bg-dark mt-2'><FontAwesomeIcon icon={faCircleXmark} className='text-light' /></button>
                                        </div>
                                    </div>)}
                                </Popup>
                            })}
                        </div>
                        <button className='d-none'></button>
                    </div>}

                    <h2 className="heading text-light text-center m-4">Around The Globe</h2>

                    <div className="top-locations-container mb-3">
                        {london && <div className="card top-location-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/London_Eye_-_tunliweb.no.JPG/1024px-London_Eye_-_tunliweb.no.JPG" className="card-img-top" alt="London" />
                            <div className="card-body bg-dark text-light">
                                <h5 className="card-title">London</h5>
                                <h1 className="card-temp text-center">{london.current.temp_c} &#8451;</h1>
                                <p className="card-text text-center">{london.current.condition.text}</p>
                            </div>
                        </div>}
                        {kolkata && <div className="card top-location-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ketan_donate4.jpg/1200px-Ketan_donate4.jpg" className="card-img-top" alt="Kolkata" />
                            <div className="card-body bg-dark text-light">
                                <h5 className="card-title">Kolkata</h5>
                                <h1 className="card-temp text-center">{kolkata.current.temp_c} &#8451;</h1>
                                <p className="card-text text-center">{kolkata.current.condition.text}</p>
                            </div>
                        </div>}
                        {newyork && <div className="card top-location-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Usa-world-trade-center-skyscrapers-reflection-night-skyline-cityscape.jpg/360px-Usa-world-trade-center-skyscrapers-reflection-night-skyline-cityscape.jpg" className="card-img-top" alt="New York" />
                            <div className="card-body bg-dark text-light">
                                <h5 className="card-title">New York</h5>
                                <h1 className="card-temp text-center">{newyork.current.temp_c} &#8451;</h1>
                                <p className="card-text text-center">{newyork.current.condition.text}</p>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default weather