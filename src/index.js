import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/homepage";
import Contacts from "./pages/contacts";
import Helpline from "./pages/helpline";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Nopage from "./pages/nopage";
import Mypage from "./pages/mypage";
import { useEffect, useState } from "react";
import Market from "./pages/market";

function DefaultComponent() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect( () => {
    window.addEventListener( "scroll", ListenScroll );
    
    if (window.location.pathname === "/mypage") {
      setLoggedIn(true)
      return;
    }
    if (window.location.pathname !== "/mypage") {
      setLoggedIn(false)
      return;
    }
  }, []);

  // the event listener for logging in
  useEffect( () => {
    const topNav = document.getElementById("topNav");
    const firstLinks = topNav.querySelectorAll(".linksOne");
    const secondLinks = topNav.querySelectorAll(".linksTwo");

    if (firstLinks && secondLinks) {
      if (loggedIn /**true */) {
        for (let int = 0; int < firstLinks.length; int++) {
          // we dont want these
          firstLinks[int].style.display = "none";
        }
        for (let int = 0; int < secondLinks.length; int++) {
          // we dont want these
          secondLinks[int].style.display = "block";
        }
        const logsOut = document.getElementById("logsOut");
        if (logsOut) {
          logsOut.addEventListener( "click", LogOut )
        }
      }
  
      if (loggedIn /**false */) {
        for (let int = 0; int < firstLinks.length; int++) {
          // we dont want these
          firstLinks[int].style.display = "block";
        }
        for (let int = 0; int < secondLinks.length; int++) {
          // we dont want these
          secondLinks[int].style.display = "none";
        }
      }
    }

  }, [loggedIn])

  // logging out
  const LogOut = () => {
    setLoggedIn(false);
  }

  // when client scrolls up, move the topNav app by (it's own height) px, and vice versa.
  let CurrentScroll = window.scrollY;
  const ListenScroll = () => {

    // TOPNAV
    const topNav = document.getElementById("topNav");
    const hasSearch = document.getElementById("hasSearch");
    const topNavHeight = -topNav.clientHeight + "px";
    const thisTopNaveight = topNav.clientHeight;
    const hasSearchHeight = hasSearch.clientHeight;
    const ourPreferredTop = -(thisTopNaveight + hasSearchHeight) + "px";

    if ( window.scrollY > CurrentScroll ) {
      //scrolled down
      topNav.style.top = topNavHeight;
      hasSearch.style.top = ourPreferredTop;
    } else {
      // scrolled up...set [top] to the default.
      topNav.style.top = "";
      hasSearch.style.top = (thisTopNaveight - 5) + "px";
    }
    CurrentScroll = window.scrollY;

    // GOUP BUTTON
    const goUp = document.getElementById("goUp");
    if( window.scrollY > 300 ) {
      goUp.style.display = 'grid';
    } else {
      goUp.style.display = '';
    }
  }

  // when buttons are clicked or window is reloaded, activeStyle them.
  useEffect( () => {
    let accessLinks = document.getElementsByClassName("accessLinks");

    if(accessLinks) {

      // Assuming the window is reloading from a backend res() or a DOMDocumentLoaded...
      const HREF = window.location.pathname;
      if (HREF === "/") {
        document.getElementById("homeLink").classList.add("currentActiveTab");
      } else {
        const trimmedHref = HREF.slice(1) + "Link";
        document.getElementById(trimmedHref).classList.add("currentActiveTab");
      }

      // add the style to only the clicked element.
      for ( let i = 0; i < accessLinks.length; i++ ) {
        const Subject = accessLinks[i];

        Subject.addEventListener( "click", event => {
          for ( let x = 0; x < accessLinks.length; x++ ) {
            accessLinks[x].classList.remove("currentActiveTab");
          }
          event.target.classList.add("currentActiveTab");
        })
      }

    } else return;

  }, [])

  // to distinguish mobile phones from others
  function isMobile() {
    return /**boolean */ /Android|webOS|iPod|iPad|iPhone|mobi|IEMobile|Opera Mini|BlackBerry/i.test(navigator.userAgent);
  }
  const Device = isMobile();
  if (Device) {
    // true( is a mobile phone)
    setPhoneStds();
  } else if (!Device) {
    // false this is not a mobile phone ===> probably a laptop, PC etc
  }
  function setPhoneStds() {
    // set styles ...esp the account forms.
    // signup form
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="helpline" element={<Helpline />} />
          <Route path="marketplace" element={<Market /> } />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot( document.getElementById("root") );
root.render( <DefaultComponent /> );