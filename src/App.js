import { useState, useEffect } from "react"
import axios from "axios"

function App() {
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

        setData(wdata.datetime.slice(11, 16))
        setDateTimeFull(datetime.slice(0, 10))
        console.log(dateTimeFull)
        setTimeZone(timezone)
        setAbbreviation(abbreviation)
        setDayOfYear(day_of_year)
        setDayOfWeek(day_of_week)
        setWeekNumber(week_number)
        setClientIP(wdata.client_ip)
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

  /**LOCATION AND TIME */
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const urlLocation = `http://ip-api.com/json/${clientIP}`

  const fetchLocalTime = async () => {
    try {
      const response = await fetch(urlLocation)
      const ldata = await response.json()
      console.log(ldata)

      setLatitude(ldata.lat)
      setLongitude(ldata.lon)
    } catch (error) {
      console.error(error)
    }
  }
  console.log(latitude)
  console.log(longitude)
  useEffect(() => {
    fetchLocalTime()
  }, [latitude, longitude])

  /*SUNSET*/
  const url3 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=5&appid=${process.env.REACT_APP_API_KEY_OPEN_WETHER}`
  const fetchSun = async () => {
    try {
      const response = await fetch(url3)
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchSun()
  }, [])

  const [quote, setQuote] = useState("The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.")
  const [autor, setAutor] = useState("Ada Lovace")

  /*QUOTES*/
  const url = "https://quotes15.p.rapidapi.com/quotes/random/"
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
      "X-Rate-Limit": 700,
      "X-Rate-Limit-Remaining": 699
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
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 60000)
    return () => clearInterval(interval)
  }, [quote, autor])
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
