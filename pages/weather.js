import Head from 'next/head'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faWind } from '@fortawesome/free-solid-svg-icons'

const weather = () => {
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
                    <h2 className="heading text-light m-3">Get weather details of your location</h2>
                    <div className="input-group mb-6 mt-3">
                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faLocationDot} /></span>
                        <input type="text" className="form-control bg-dark text-light" placeholder="Enter place" aria-label="Location" aria-describedby="basic-addon1" />
                        <a href="#" className="btn btn-primary mx-2 border border-rounded" aria-current="page">Search</a>
                    </div>

                    <div className="weather-container my-3 rounded" >
                        <div className="weather-location text-light rounded bg-dark px-3 py-1">Kolkata, West Bengal As of time here</div>
                        <div className="weather-headline d-flex justify-content-between align-items-center">
                            <div className="weather-headline-left px-3">
                                <h1 className="temp text-light">32 &#8451;</h1>
                                <p className="condition text-light">Haze</p>
                                <p className="high-low-temp text-light">Day 38 &#8451; | Night 30 &#8451;</p>
                            </div>
                            <div className="weather-headline-right px-5 align-items-center"><FontAwesomeIcon icon={faWind} className='fa-3x text-light'/></div>
                        </div>
                    </div>

                    <h2 className="heading text-light text-center m-4">Top Locations Around The Globe</h2>

                    <div className="top-locations-container mb-3">
                        <div className="card top-location-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/London_Eye_-_tunliweb.no.JPG/1024px-London_Eye_-_tunliweb.no.JPG" className="card-img-top" alt="London" />
                            <div className="card-body bg-dark text-light">
                                <h5 className="card-title">London</h5>
                                <h1 className="card-temp">25 &#8451;</h1>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        <div className="card top-location-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ketan_donate4.jpg/1200px-Ketan_donate4.jpg" className="card-img-top" alt="Kolkata" />
                            <div className="card-body bg-dark text-light">
                                <h5 className="card-title">Kolkata</h5>
                                <h1 className="card-temp">25 &#8451;</h1>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        <div className="card top-location-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Usa-world-trade-center-skyscrapers-reflection-night-skyline-cityscape.jpg/360px-Usa-world-trade-center-skyscrapers-reflection-night-skyline-cityscape.jpg" className="card-img-top" alt="New York" />
                            <div className="card-body bg-dark text-light">
                                <h5 className="card-title">New York</h5>
                                <h1 className="card-temp">25 &#8451;</h1>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default weather