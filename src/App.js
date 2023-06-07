import { useState, useEffect } from "react"
import useGeolocation from "react-navigator-geolocation";
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
      const result = await response.text()
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
/*WORLTIME*/
const [currentTime, setCurrentTime]=useState(null)
const [timeZone, setTimeZone]=useState(null)
useEffect(()=>{
  const fetchTime =async ()=>{
    try {
      const response = await 
      axios.get("http://worldtimeapi.org/api/ip")
      const{datetime, timezone}  = response.data
      setCurrentTime(datetime)
     setTimeZone(timezone)} catch(error) {
      console.log(error)
     }
 
  }
  fetchTime()
},[])
console.log(timeZone)
console.log(currentTime)

/*GEOLOCATION
const [locationData, setLocationData] = useState(null)
const options2 = {
  method: 'GET',
  url:"https://api.ipbase.com/v2/",
  params: {ip: '1.1.1.1'},
  headers: {
    'X-RapidAPI-Key': 'oXGf0IdiddMXLD7a9ggFZnS590DNv6znSrOBRmgy',
    'X-RapidAPI-Host': 'ipbase-ip-geolocation-api.p.rapidapi.com'
  }
};
const fetchGeoData = async () => {
  const response = await fetch(url, options2)
  const datalocation = await response.json()
  console.log(datalocation)
  setLocationData(datalocation)
 
  try {
    const response = await fetch(url, options2)
    const result = await response.text()
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
useEffect(() => {
  fetchGeoData();
}, []);


/*
useEffect(() => {
  const fetchLocation = async () => {
    try {
      const response = await axios.get("https://api.ipbase.com/v2/");

      setLocationData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchLocation();
}, []);
console.log(locationData)*/

  /*HIDE QUOTE*/
  const [description, setDescription] = useState(false)
  const handleClickDescription = () => {
    setDescription(!description)
  }
  const handleClickQuote = () => {
    fetchData()
  }

  /*useEffect(() => {
    const getDataAfterTimeOut = setInterval(() => {
     
        fetchData()
    
    }, 30000)
    return () => clearInterval(getDataAfterTimeOut)
  }, [])*/

  /*useEffect(() => {
    fetchData()
  }, [])
  console.log(quote)
  /*
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)

  function handleLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      console.log("Geolocation not supported")
    }
  }
  useEffect(() => {
    handleLocation()
  }, [])

  function success(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    setLocation({ latitude, longitude })
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)

    // Make API call to OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cb6a13d1a17e74c78d0fac8bacf21fa7`)
      .then(response => response.json())
      .then(data => {
        setWeather(data)
        console.log(data)
      })
      .catch(error => console.log(error))
  }

  function error() {
    console.log("Unable to retrieve your location")
  }
  console.log(weather)
  console.log(location)
  /*
  useEffect(() => {
 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
       
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }   console.log(latitude)
          console.log(longitude)
  }, []);


  useEffect(() => {
    
    if (latitude && longitude) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cb6a13d1a17e74c78d0fac8bacf21fa7`
        )
        .then((response) => {
          console.log(response.data); // Handle the response data
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [latitude, longitude]);

*/
  
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
              <h1 className="current-time">
               {currentTime.slice(11,16)}<span className="span-bst">BST</span>
              </h1>
              <h3>IN {timeZone.slice(7,18)}<span className="ms-3">{weather.sys.country}</span></h3>
            </div>
            <div className="btn-more">
              <button className="btn btn-light" onClick={handleClickDescription}>
                more
                <img src="/assets/desktop/icon-arrow-up.svg" alt="arrow-down" />
              </button>
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className={`description ${description ? "open-description" : "close-description"}`}>
          <div className="left-description">
            <p>current time zone</p>
            <h2>EUROPE/LONDON</h2>
            <p>day of the year</p>
            <h2>295</h2>
          </div>
          <div className="right-description">
            {" "}
            <p>day of the week</p>
            <h2>5</h2>
            <p> week number</p>
            <h2>55</h2>
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
