import { useState, useEffect } from "react"
import axios from "axios"

function App() {
  const [quote, setQuote] = useState("The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.")
  const [autor, setAutor] = useState("Ada Lovace")

  /*QUOTES*/
  const url = "https://quotes15.p.rapidapi.com/quotes/random/"
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      "X-RapidAPI-Host": "quotes15.p.rapidapi.com"
    }
  }
  const fetchData = async () => {
    try {
      const response = await fetch(url, options)
      const dataQuote = await response.json()
      console.log(dataQuote)
      setQuote(dataQuote.content)
      setAutor(dataQuote.originator.name)
    } catch (err) {
      setError(err.message)
      setQuote(null)
      setAutor(null)
      console.log(error)
    }
  }

  /*WORLTIME*/

  const [data, setData] = useState(null)
  const [dateTimeFull, setDateTimeFull] = useState(null)
  const [abbreviation, setAbbreviation] = useState()
  const [timeZone, setTimeZone] = useState(null)
  const [dayOfYear, setDayOfYear] = useState(null)
  const [dayOfWeek, setDayOfWeek] = useState(null)
  const [weekNumber, setWeekNumber] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [clientIP, setClientIP] = useState(null)
  console.log(clientIP)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://worldtimeapi.org/api/ip")
        const wdata = await response.json()
        console.log(wdata)
        const { timezone, datetime, abbreviation, day_of_year, day_of_week, week_number, client_ip } = wdata

        setData(datetime.slice(11, 16))
        setDateTimeFull(datetime.slice(0, 10))
        console.log(dateTimeFull)
        setTimeZone(timezone)
        setAbbreviation(abbreviation)
        setDayOfYear(day_of_year)
        setDayOfWeek(day_of_week)
        setWeekNumber(week_number)
        setClientIP(client_ip)
        setLoading(true)
      } catch (err) {
        setError(err.message)
        setData(null)
        setTimeZone(null)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [loading])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 60000)
    return () => clearInterval(interval)
  }, [quote, autor])

  /**LOCATION AND TIME */
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const urlLocation = `http://ip-api.com/json/${clientIP}`

  const fetchLocalTime = async () => {
    try {
      const response = await fetch(urlLocation)
      const ldata = await response.json()
      const { lon, lat } = ldata
      console.log(ldata)
      setLatitude(ldata.lat)
      setLongitude(ldata.lon)
      console.log(latitude)
      console.log(longitude)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchLocalTime()
  }, [])

  /*SUNSET*/
  /* date: `${dateTimeFull}`,
      latitude: `${latitude}`,
      longitude: `${longitude}`,
      timeZoneId: `${timeZone}`*/
  const options3 = {
    method: "GET",
    url: "https://sunrise-sunset-times.p.rapidapi.com/getSunriseAndSunset",
    params: {
      date: "2021-10-31",
      latitude: "51.5072",
      longitude: "-0.1276",
      timeZoneId: "America/New_York"
    },
    headers: {
      "X-RapidAPI-Key": "02df9e7ffbmshcce54fcdba3ad4bp1c0149jsn5afc4d45cc52",
      "X-RapidAPI-Host": "sunrise-sunset-times.p.rapidapi.com"
    }
  }
  const fetchSunset = async () => {
    try {
      const response = await axios.request(options3)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchSunset()
  }, [])

  /*GEOLOCATION
  const [locationData, setLocationData] = useState(null)
  const [countryCode, setCountryCode] =useState(null)
  const fetchGeoData = async () => {
    const response = await axios.get("https://api.ipbase.com/v2/info?apikey=oXGf0IdiddMXLD7a9ggFZnS590DNv6znSrOBRmgy")
  try {
    const response = await axios.get("https://api.ipbase.com/v2/info?apikey=oXGf0IdiddMXLD7a9ggFZnS590DNv6znSrOBRmgy")
    console.log(response)
   setLocationData(response.data.data.location.city.name)
   setCountryCode(response.data.data.location.country.alpha3)  
   
  } catch (err) {
    setError(err.message)
   setLocationData(null)
   setCountryCode(null)
  } finally {
    setLoading(false)
  }
}
useEffect(() => {
  fetchGeoData();
}, []);
console.log(locationData)
console.log(countryCode)
*/
  /*HIDE QUOTE*/
  const [description, setDescription] = useState(false)
  const handleClickDescription = () => {
    setDescription(!description)
  }
  const handleClickQuote = () => {
    fetchData()
  }

  return (
    <main>
      <header>
        <div className="wrapper-title">
          {!description && (
            <div className="header-quote">
              <div className="quote-wrapper">
                <p className="quote">"{quote}"</p>
                <small>{autor}</small>
              </div>
              <button className="btn-refresh" onClick={handleClickQuote}>
                <img src="/assets/desktop/icon-refresh.svg" alt="refresh" />
              </button>
            </div>
          )}
          <div className="header-title">
            <div className="current">
              <p className="current-description">
                <span className="me-2">
                  <img src="/assets/desktop/icon-sun.svg" alt="sun" />
                </span>
                GOOD MORNING, IT’S CURRENTLY
              </p>
              {!loading && (
                <h1 className="current-time">
                  {data}
                  <span className="span-bst">{abbreviation}</span>
                </h1>
              )}
              {loading && <p className="fs-3">Loading....</p>}
              <h3 className="current-timezone">
                IN <span className="ms-3">{timeZone}</span>
                <span className="ms-3">{}</span>
              </h3>
            </div>
            <div className="btn-more">
              <button className="btn__more" onClick={handleClickDescription}>
                <span className="mx-3">more</span>
                <img src="/assets/desktop/icon-arrow-up.svg" alt="arrow-down" className={`arrow ${description ? "active" : ""}`} />
              </button>
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className={`description ${description ? null : "close-description"}`}>
          <div className="left-description">
            <p>current time zone</p>
            <h2>{timeZone}</h2>
            <p>day of the year</p>
            <h2>{dayOfYear}</h2>
          </div>
          <div className="right-description">
            {" "}
            <p>day of the week</p>
            <h2>{dayOfWeek}</h2>
            <p>week number</p>
            <h2>{weekNumber}</h2>
          </div>
        </div>
      </header>
      <div>
        <img src="/assets/desktop/bg-image-daytime.jpg" alt="background" className="image-desktop" />
      </div>
    </main>
  )
}

export default App
