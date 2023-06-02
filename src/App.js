import { useState } from "react"

function App() {
  const [description, setDescription] = useState(false)
  const handleClickDescription = () => {
    setDescription(!description)
  }
  return (
    <main>
      <header>
        <div className="wrapper-title">
          {description && (
            <div className="header-quote">
              <div className="quote-wrapper">
                <p className="quote">“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”</p>
                <small>Ada Lovace</small>
              </div>
              <div className="image-wrapper">
                <img src="/assets/desktop/icon-refresh.svg" alt="refresh" />
              </div>
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
      </header>{" "}
      <div
        className={` d-flex       
        ${!description ? "description" : ".description.open-description"}`}
      >
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
    </main>
  )
}

export default App
