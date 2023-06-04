import { useState, useEffect } from "react"

function App() {
  const [quote, setQuote] = useState("The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.")
  const [autor, setAutor] = useState("Ada Lovace")
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
  /*
  useEffect(() => {
    fetchData()
  }, [])*/

  const [description, setDescription] = useState(false)
  const handleClickDescription = () => {
    setDescription(!description)
  }
  const handleClickQuote = () => {
    fetchData()
  }

  /*useEffect(() => {
    fetchData()
  }, [])*/
  console.log(quote)
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
                11:37<span className="span-bst">BST</span>
              </h1>
              <h3>IN LONDON UK</h3>
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
