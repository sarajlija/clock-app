import { useState, useEffect } from "react"

function App() {
  /*WORLTIME*/

  const [clockDate, setClockDate] = useState(null)
  const [dateTimeFull, setDateTimeFull] = useState(null)
  const [abbreviation, setAbbreviation] = useState()
  const [timeZone, setTimeZone] = useState(null)
  const [dayOfYear, setDayOfYear] = useState(null)
  const [dayOfWeek, setDayOfWeek] = useState(null)
  const [weekNumber, setWeekNumber] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [clientIP, setClientIP] = useState(null)
  //console.log(clientIP)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://worldtimeapi.org/api/ip")
        const wdata = await response.json()
        console.log(wdata)
        const { timezone, datetime, abbreviation, day_of_year, day_of_week, week_number, client_ip } = wdata

        setClockDate(wdata.datetime.slice(11, 16))
        // console.log(clockDate)
        setDateTimeFull(wdata.datetime.slice(0, 10))
        // console.log(dateTimeFull)
        setTimeZone(timezone)
        setAbbreviation(abbreviation)
        setDayOfYear(day_of_year)
        setDayOfWeek(day_of_week)
        setWeekNumber(week_number)
        setClientIP(wdata.client_ip)
        setLoading(true)
      } catch (err) {
        setError(err.message)
        setClockDate(null)
        setTimeZone(null)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [loading, clientIP, clockDate, timeZone])

  /**LOCATION AND TIME */
  const [localLatitude, setLocalLatitude] = useState(null)
  const [localLongitude, setLocalLongitude] = useState(null)
  const urlLocation = `https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.REACT_APP_API_KEY_GEO_APFI}`
  let requestOptions = {
    method: "GET"
  }

  const fetchLocalTime = async () => {
    try {
      const response = await fetch(urlLocation, requestOptions)
      const ldata = await response.json()

      console.log(ldata)

      setLocalLatitude(ldata.location.latitude)
      setLocalLongitude(ldata.location.longitude)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchLocalTime()
  }, [localLatitude, localLongitude])

  /*SUNSET*/
  const [sunsetQuery, setSunsetQuery] = useState()
  const [sunriseQuery, setSunriseQuery] = useState()
  const [cityName, setCityName] = useState(null)
  const [countryCode, setCountryCode] = useState(null)
  const url3 = `https://api.openweathermap.org/data/2.5/weather?lat=${localLatitude}&lon=${localLongitude}&cnt=15&appid=${process.env.REACT_APP_API_KEY_OPEN_WETHER}`
  const fetchSun = async () => {
    try {
      const response = await fetch(url3)
      const result = await response.json()
      console.log(result)
      setSunriseQuery(result.sys.sunrise)
      setSunsetQuery(result.sys.sunset)
      setCityName(result.name)
      setCountryCode(result.sys.country)
    } catch (error) {
      console.error(error)
    }
  }
  console.log(sunsetQuery)
  console.log(sunriseQuery)
  useEffect(() => {
    fetchSun()
  }, [url3])

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
  }, [url, quote, autor])
  /*HIDE QUOTE*/
  const [description, setDescription] = useState(false)
  const handleClickDescription = () => {
    setDescription(!description)
  }
  const handleClickQuote = () => {
    fetchData()
  }
  /*CHECK_DAYLIGHT*/

  const [isDaytime, setIsDaytime] = useState(null)

  useEffect(() => {
    const checkDaylight = () => {
      const date = new Date()
      console.log(date)
      const unixTimestamp = Math.floor(date.getTime() / 1000)
      console.log(unixTimestamp)

      if (unixTimestamp > sunriseQuery && unixTimestamp < sunsetQuery) {
        setIsDaytime(true)
        console.log(isDaytime)
      } else {
        setIsDaytime(false)
        console.log(isDaytime)
      }
    }

    checkDaylight()

    const interval = setInterval(checkDaylight, 60000) // Update every minute

    return () => {
      clearInterval(interval) // Clean up the interval on component unmount
    }
  }, [isDaytime])

  return (
    <main>
      <header>
        <div className="wrapper-title">
          {!description && (
            <div className="header-quote">
              <div className="quote-wrapper">
                <p className="quote">"{quote}"</p>
                <p className="autor">{autor}</p>
              </div>
              <button className="btn-refresh" onClick={handleClickQuote}>
                <img src="/assets/desktop/icon-refresh.svg" alt="refresh" />
              </button>
            </div>
          )}
          <div className="header-title">
            <div className="current">
              <p className="current-description">
                <span className="me-2">{isDaytime ? <img src="/assets/desktop/icon-sun.svg" alt="sun" /> : <img src="/assets/desktop/icon-moon.svg" alt="moon" />}</span>
                {isDaytime ? <span>GOOD MORNING, IT’S CURRENTLY</span> : <span>GOOD EVENING</span>}
              </p>
              {!loading && (
                <h1 className="current-time">
                  {clockDate}
                  <span className="span-bst">{abbreviation}</span>
                </h1>
              )}
              {loading && <p className="fs-3">Loading....</p>}
              <h3 className="current-timezone">
                IN <span className="ms-3">{cityName},</span>
                <span className="ms-3">{countryCode}</span>
              </h3>
            </div>
            <div className="btn-more">
              <button className="btn__more" onClick={handleClickDescription}>
                {!description ? <span className="mx-2">more</span> : <span className="mx-2">less</span>}
                <img src="/assets/desktop/icon-arrow-up.svg" alt="arrow-down" className={`arrow ${description ? "active" : ""}`} />
              </button>
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className={`description ${description ? null : "close-description"}`}>
          <div className="left-description">
            <div className="time-zone">
              <p>current time zone</p>
              <h2>{timeZone}</h2>
            </div>
            <div className="day-of-year">
              <p>day of the year</p>
              <h2>{dayOfYear}</h2>
            </div>
          </div>
          <div className="right-description">
            <div className="day-of-week">
              {" "}
              <p>day of the week</p>
              <h2>{dayOfWeek}</h2>
            </div>
            <div className="week-number">
              {" "}
              <p>week number</p>
              <h2>{weekNumber}</h2>
            </div>
          </div>
        </div>
      </header>
      {!isDaytime ? <img src="/assets/desktop/bg-image-daytime.jpg" alt="background" className="image-desktop" /> : <img src="/assets/desktop/bg-image-nighttime.jpg" alt="background" className="image-desktop" />}
      {!isDaytime ? <img src="/assets/tablet/bg-image-daytime.jpg" alt="background" className="image-tablet" /> : <img src="/assets/tablet/bg-image-nighttime.jpg" alt="background" className="image-tablet" />}
      {!isDaytime ? <img src="/assets/mobile/bg-image-daytime.jpg" alt="background" className="image-mobile" /> : <img src="/assets/mobile/bg-image-nighttime.jpg" alt="background" className="image-mobile" />}
    </main>
  )
}

export default App
