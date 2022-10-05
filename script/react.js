const HeaderComponent = () => {
  return(
    <>
    <div class="container">
        <div class="gap">
          <div class="wrap">
            <nav id="nav">
              <div class="left-area">
                <h1>
                  <a href="./about.html"><img src="./storage/image/web_footage/bridge_icon.png" alt="logo"/></a>
                </h1>
              </div>
              <div class="right-area">
                <ul class="f_sub">
                  <li><a href="./about.html">About</a></li>
                  <li><a href="./works.html">Works</a></li>
                  <li><a href="./contact.html">Contact</a></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <svg width="100%" height="3">
        <line x1="0" x2="100%"/>
      </svg>
    </>
  )
}
const FooterComponent = () => {
  return(
    <></>
  )
}


ReactDOM.render(
  <HeaderComponent/>,
  document.getElementById('header')
);
ReactDOM.render(
  <FooterComponent/>,
  document.getElementById('footer')
);