import { Outlet, Link } from "react-router-dom";
import "../App.css";
import { MdShoppingBasket, MdCancel } from "react-icons/md";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Layout = () => {
    
    const [actions, setActions] = useState(false); // engaged on hovers above the myPage link
    const [mouseActions, setMouseActions] = useState(0); // for when the mouse is on the actions div. We want to know when it leaves.
    const [alternations, setAlternations] = useState(false); // if true, page is logged in
    var coord_one_ref = useRef(null);
    var coord_two_ref = useRef(null);

    // for alternating the three Links
    useEffect( () => {
        
        const signupLink = document.getElementById("signupLink");
        const loginLink = document.getElementById("loginLink");
        const mypageLink = document.getElementById("mypageLink");
        const shoppingBasket = document.getElementById("shoppingBasket");
        
        if (alternations) {
            signupLink.style.display = "none";
            loginLink.style.display = "none";
            mypageLink.style.display = "block";
            shoppingBasket.style.display = "block";
            return;

        } else {
            signupLink.style.display = "block";
            loginLink.style.display = "block";
            mypageLink.style.display = "none";
            shoppingBasket.style.display = "none";
        }
        
    }, [alternations])

    let actionsWidth;
    // set an alt
    // if mypage is true, login and signup is false and vice versa
    const MyPageHovered = event => {
        const top = event.target.getBoundingClientRect().top;
        const eventHeight = event.target.parentElement.clientHeight;        
        coord_one_ref.current = (top + eventHeight) + "px"; // vertical
        setActions( actions => true );

    }
    
    // for when mouse is on actions div or not
    useEffect( () => {
        if (mouseActions === 0) {
            setActions( actions => false)
        } else {
            setActions(true)
        }
    }, [mouseActions])
    
    const mouseLeftActions = () => {
        if (mouseActions === 1) {
            setActions( actions => actions);
            return
        }
        setActions( actions => false );
    }
    
    useEffect( () => {
        const actionsDiv = document.getElementById("actionsDiv");
        if (actionsDiv) {
            if (actions) {
                actionsDiv.style.display = "grid";
                actionsDiv.style.top = coord_one_ref.current;
                actionsWidth = actionsDiv.clientWidth;
                coord_two_ref.current = (window.innerWidth - actionsWidth - 10) + "px";
                actionsDiv.style.left = coord_two_ref.current;
            } else {
                actionsDiv.style.display = "";
            }
        }
    }, [actions, coord_one_ref.current, coord_two_ref.current]);

    const ClickedActions = event => {
        setActions(!actions);
    }

    const mouseOnActionsDiv = () => {
        setMouseActions( mouseActions => 1 );
        window.addEventListener( "click", ClickedActions )
    }

    const mouseLeftActionsDiv = () => {
        setMouseActions( mouseActions => 0 )
        window.removeEventListener( "click", ClickedActions )
    }

    // when we log in correctly, the page reloads(backend order). let's check the new pathname.
    useEffect( () => {
        const Href = window.location.pathname;
        if (Href === "/mypage") {
            setAlternations(true)
        }
    }, [])

    const LogOut = () => {
        // we are logged out
        setAlternations( alternations => false )

        // initiate server side action
        const myXML = new XMLHttpRequest();
        myXML.open("POST", "http://localhost:8080/user/logout");
        myXML.onreadystatechange = () => {
            if (myXML.readyState === 4 && myXML.status === 200) {
                console.log("Usuário desconectado!");
            }
        }
        myXML.send();
        
    }

    const windowClicked = event => {
        const li = event.target.parentElement;
        const ul = li.parentElement;
        const div = ul.parentElement;

        if ( div.id === "actionsDiv" ) {
            setMouseActions( mouseActions => false );
        }
    }

    useEffect( () =>{
        if (mouseActions) {
            window.addEventListener( "click", windowClicked );
        } else {
            window.removeEventListener( "click", windowClicked );
        }
    }, [mouseActions]);

    // scroll up
    const ScrollUp = () => {
        window.scrollTo( { top:0, left:0, behavior:"smooth" } );
    }

    // when topnav is clicked.
    const topNavClicked = event => {
        if ( event.target.tagName.toString().toLowerCase() === "a" ) {
            window.scrollTo(0, 0)
        }
    }

    // search results
    // currently not working
    const searchResults = event => {
        const searchInput = event.target.value.toString().toLowerCase();
        const titleParagraphs = document.getElementsByClassName("titleParagraph");

        if (titleParagraphs) {
            for ( let g = 0; g < titleParagraphs.length; g++ ) {
                const titleContent = titleParagraphs[g].innerHTML.toString().toLowerCase();
                const substr = titleContent.substring(0, searchInput.length);
                if (searchInput === substr) {
                    for (let x = 0; x < titleParagraphs.length; x++) {                        
                        titleParagraphs[x].classList.remove("searchResult");
                    }
                    titleParagraphs[g].classList.add("searchResult");
                }
            }
        }
    }

    // side menu
    const SideMenu = () => {
        const sideMenu = document.getElementById("sideMenu");
        if (sideMenu) {
            sideMenu.style.left = "0px";
        }
    }

    // toggle side menu off
    const SideMenuOff = () => {
        const sideMenu = document.getElementById("sideMenu");
        if (sideMenu) {
            sideMenu.style.left = "";
        }
    }

    // when side menu links are clicked
    const sideNavLinkClicked = () => {
        console.log('clicked');
    }

    return(
        <>
            <div className="topNav" id="topNav" onClick={topNavClicked}>
                <nav className="topNavLeft">
                    <Link to="/" className="companyLink">Retro Classics</Link>
                </nav>

                <nav className="topNavMid">
                    <ul>

                        <li>
                            <Link to="/" id="homeLink" className="links accessLinks" >Home</Link>
                        </li>
                            
                        <li>
                            <Link to="/marketplace" id="marketplaceLink" className="links accessLinks" >Marketplace</Link>
                        </li>

                        <li>
                            <Link to="/contacts" id="contactsLink" className="links accessLinks" >Contacts</Link>    
                        </li>

                        <li>
                            <Link to="/helpline" id="helplineLink" className="links accessLinks" >Helpline</Link>
                        </li>
                        
                    </ul>
                </nav>
                <nav className="topNavRight">
                    <ul>

                        <li>
                            <Link to="/signup" className="links" id="signupLink">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/login" className="links" id="loginLink">Login</Link>
                        </li>
                        <li>
                            <span id="shoppingBasket">< MdShoppingBasket/><sup id="basketCount"><sup>0</sup></sup></span>
                        </li>
                        <li>
                            <Link to="/mypage" className="links" id="mypageLink" onMouseEnter={MyPageHovered} onMouseLeave={mouseLeftActions}>Mypage</Link>
                        </li>

                    </ul>
                </nav>
            </div>

            <div className="hasSearch" id="hasSearch">
            <button class="menuBtn" onClick={SideMenu}>
                <span class="icon">
                    <svg viewBox="0 0 175 80" width="40" height="40">
                        <rect width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                        <rect y="30" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                        <rect y="60" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                    </svg>
                </span>
                <span class="text">MENU</span>
            </button>
                <input type="text" name="" id="searchInput" onInput={searchResults} placeholder="search item..." />
            </div>

            <div className="actions" id="actionsDiv" onMouseEnter={mouseOnActionsDiv} onMouseLeave={mouseLeftActionsDiv}>

                <ul>
                    <li>    
                        <Link to="" className="actionLinks">My Account</Link>
                    </li>

                    <li>    
                        <Link to="" className="actionLinks">Become a seller</Link>
                    </li>

                    <li>
                        <Link to="" className="actionLinks">All accounts</Link>
                    </li>

                    <li>    
                        <Link to="" className="actionLinks">Sign out</Link>
                    </li>

                    <li>    
                        <Link to="" className="actionLinks">Log into another account</Link>
                    </li>

                    <li>    
                        <Link to="" className="actionLinks" onClick={LogOut}>Log out</Link>
                    </li>
                </ul>

            </div>

            <div id="actionCannotComplete" className="actionCannotComplete">
                <div className="innerActionCannotComplete" id="innerActionCannotComplete">
                    <div id="cannotCompleteCancel" className="cannotCompleteCancel">
                        <span>Error!</span>
                    </div>
                    <p>This action cannot be completed.</p>
                    <p>Please <a href="/login">Login</a> or <a href="/signup">Sign up</a> to <b>Retro Classics.</b></p>
                </div>
            </div>

            <button type="button" className="goUp" id="goUp" title="Scroll up" onClick={ScrollUp}><FaArrowAltCircleUp /></button>

            <div className="sideMenu" id="sideMenu">
                <div className="sideMenuOff" onClick={SideMenuOff}>
                    <span><MdCancel /></span>
                </div>
                <nav>
                    <button type="button" className="homeNavLi">
                        <Link to="/" className="sideNavLinks" onClick={sideNavLinkClicked}>New Arrivals</Link>
                    </button>
                    <button type="button" className="homeNavLi">
                        <Link to="" className="sideNavLinks" onClick={sideNavLinkClicked}>Furniture</Link>
                    </button>
                    <button type="button" className="homeNavLi">
                        <Link to="" className="sideNavLinks" onClick={sideNavLinkClicked}>Art</Link>
                    </button>
                    <button type="button" className="homeNavLi">
                        <Link to="" className="sideNavLinks" onClick={sideNavLinkClicked}>Lighting</Link>
                    </button>
                    <button type="button" className="homeNavLi">
                        <Link to="" className="sideNavLinks" onClick={sideNavLinkClicked}>Decor</Link>
                    </button>
                    <button type="button" className="homeNavLi">
                        <Link to="" className="sideNavLinks" onClick={sideNavLinkClicked}>Outoor</Link>
                    </button>
                    <button type="button" className="homeNavLi">
                        <Link to="" className="sideNavLinks" onClick={sideNavLinkClicked}>Beads & Beauty</Link>
                    </button>
                </nav>
            </div>
            
            <Outlet />
        </>
    )
}

export default Layout;