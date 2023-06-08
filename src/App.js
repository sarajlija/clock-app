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
    const response = await fetch(url, options)
    const dataQuote = await response.json()
    console.log(dataQuote)
    setQuote(dataQuote.content)
    setAutor(dataQuote.originator.name)
    try {
      const response = await fetch(url, options)
      const dataQuote = await response.text()
      console.log(dataQuote)
    } catch (err) {
      setError(err.message)
      setQuote(null)
      setAutor(null)
      console.log(error)
    }
  }

  /*WORLTIME*/

  const [data, setData] = useState(null)
  const [abbreviation, setAbbreviation] = useState()
  const [timeZone, setTimeZone] = useState(null)
  const [dayOfYear, setDayOfYear] = useState(null)
  const [dayOfWeek, setDayOfWeek] = useState(null)
  const [weekNumber, setWeekNumber] =useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://worldtimeapi.org/api/ip")
        console.log(response)       
        setData(response.data.datetime.slice(11, 16))
        setTimeZone(response.data.timezone)
        setAbbreviation(response.data.abbreviation)
        setDayOfYear(response.data.day_of_year)
        setDayOfWeek(response.data.day_of_week)
        setWeekNumber(response.data.week_number)
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
                <p className="quote">{quote}</p>
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
                <span>
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
              <h3>
                IN <span className="ms-3">{timeZone}</span><span className="ms-3">{}</span>
              </h3>
            </div>
            <div className="btn-more">
              <button className="btn__more" onClick={handleClickDescription}>
                <span className="mx-3">more</span>
                <img src="/assets/desktop/icon-arrow-up.svg" alt="arrow-down" className={`arrow ${description?"active":""}`}/>
              </button>
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className={`description ${description ? "open-description" : "close-description"}`}>
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
        <img src="/assets/desktop/bg-image-daytime.jpg" alt="background" className="image" />
      </div>
    </main>
  )
}

export default App
