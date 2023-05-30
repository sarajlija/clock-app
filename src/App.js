function App() {
  return (
    <main>
      <section className="section">
        <div className="header">
          <div className="header-quote">
            <div className="quote-wrapper">
              <p className="quote">“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”</p>
              <small>Ada Lovace</small>
            </div>
            <div className="image-wrapper">
              <img src="/assets/desktop/icon-refresh.svg" alt="refresh" />
            </div>
          </div>
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
              <button className="btn btn-light">
                more
                <img src="/assets/desktop/icon-arrow-up.svg" alt="arrow-down" />
              </button>
            </div>
          </div>
          {/*<div className="header-wrapper"> </div>*/}
          <div className="description">DESCRIPTION</div>
        </div>
        <img src="/assets/desktop/bg-image-daytime.jpg" alt="daytime" className="image" />
      </section>
    </main>
  )
}

export default App
