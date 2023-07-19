import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import namedCountries from "../scripts/countries";

const Signup = () => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [countries, setCountries] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    // know when form can be submitted
    useEffect( () => {
        if(formIsValid){
            document.getElementsByTagName("form")[0].submit();
            // perform changes to the topNav
            setLoggedIn(true);
        }
    }, [formIsValid])

    // user is logged in
    useEffect( () => {
        if (loggedIn /**true */) {
            const topNav = document.getElementById("topNav");
            const firstLinks = topNav.querySelectorAll(".linksOne");
            const secondLinks = topNav.querySelectorAll(".linksTwo");
            if (firstLinks && secondLinks) {
                for (let int = 0; int < firstLinks.length; int++) {
                    firstLinks[int].style.display = "none";
                }
                for (let int = 0; int < secondLinks.length; int++) {
                    secondLinks[int].style.display = "block";
                }
            }
        }
        
        if (!loggedIn /**false */) {
            const topNav = document.getElementById("topNav");
            const firstLinks = topNav.querySelectorAll(".linksOne");
            const secondLinks = topNav.querySelectorAll(".linksTwo");
            if (firstLinks && secondLinks) {
                for (let int = 0; int < firstLinks.length; int++) {
                    firstLinks[int].style.display = "block";
                }
                for (let int = 0; int < secondLinks.length; int++) {
                    secondLinks[int].style.display = "none";
                }
            }
        }
            
    }, [loggedIn] /**listen to the change. */)

    // VALIDATE FORM DATA
    const ValidateData = event => {
        if ( formIsValid ) {
            event.target.submit();
            return true;
        }
        // form validation is, by default, not true.
        event.preventDefault();
        
        // email format
        const email = document.getElementById("Email").value;
        const indexOfAt = email.lastIndexOf("@");
        let dotsInEmail = [];
        if (email && indexOfAt) {
            if ((email.length - indexOfAt) < 5) {
                alert("There must be at least 4 characters after '@' in your email.")
                return;
            }
            for ( let i = indexOfAt; i < email.length; i++ ) {
                if (email[i] === "." ) {
                    dotsInEmail += email[i];
                }
            }
            if ( dotsInEmail.length === 0 ) {
                alert("Your email appears to be wrong. There must be a dot somewhere after '@'.")
                return;
            }
        }
        
        // name ==> check if there are only 2 names(validation = true)
        var name = document.getElementById("FullName").value;
        let spaces = [];
        for (let i = 0; i < name.length; i++) {
            const element = name[i];
            if ( element === " " ) {
                spaces += element;
            }
        }
        if (spaces.length !== 1 ) {
            alert("Your Full Name must be 2 names.");
            return;
        }

        // password match
        const confirmpassword = document.getElementById("ConfirmPassword").value;
        const password = document.getElementById("Password").value;
        if ( password.length < 7 ) {
            alert("Password must be at least 7 characters long.");
            return;
        }
        if (confirmpassword !== password) {
            alert("Password confirmation was wrong.")
            return;
        }

        // country
        const Country = document.getElementById("Country").value.toString();
        if (Country === "") {
            alert("Select Country.")
            return;
        }
        
        // mobile number
        let mobileNumber = document.getElementById("MobileNumber").value;
        if(mobileNumber.length !== 10) {
            alert("Check mobile number length.");
            return;
        }
        mobileNumber = parseFloat(mobileNumber); /**make the string a number and extract */
        mobileNumber = "0" + mobileNumber;
        mobileNumber = mobileNumber.toString();
        if(mobileNumber.length !== 10) {
            alert("A mobile number can only be in digits.");
            return;
        }

        setFormIsValid(true);

    }

    // when the countries div is clicked
    const CountryClicked = event => {
        alert("here")
        const signupModal = document.getElementById("signupModal");
        const countryInput = signupModal.querySelector("#Country");
        if (countryInput) {
            alert(event.target.innerHTML)
            countryInput.value = event.target.innerHTML;
            event.target.parentElement.style.display = "";
            return;
        }
    }
    
    // when countries are engaged from blur() and focus(), perform actions
    useEffect( () => {
        const signupModal = document.getElementById("signupModal");
        const countriesDiv = document.getElementById("countriesDiv");
        const countriesInput = signupModal.querySelector("#Country");

        countriesDiv.style.display = countries ? "flex" : "none";
        
        if (countries === true) {
            countriesDiv.style.display = "flex";
            if (signupModal && countriesDiv) {
                // arrange countries in alphabetical order
                let sortedCountries = [];
                for (let i = 0; i < namedCountries.length; i++) {
                    sortedCountries.push(namedCountries[i].name);
                }
                sortedCountries.sort();
                
                // create buttons and insert values into them
                for (let int = 0; int < sortedCountries.length; int++) {
                    const button = document.createElement("button")
                    button.setAttribute("type", "button");
                    button.innerHTML = sortedCountries[int];
                    button.addEventListener("click", CountryClicked);
                    countriesDiv.appendChild(button);
                    const buttonHeight = button.clientHeight;

                    // set height of the countries div to only fit a max of 3 buttons
                    if (int === 0) {
                        countriesDiv.style.height = 3 * buttonHeight + "px";
                    }

                    // position countriesDiv
                    if (countriesInput) {
                        const top = countriesInput.getBoundingClientRect().top - buttonHeight;
                        const left = countriesInput.getBoundingClientRect().left;
                        countriesDiv.style.top = top + "px";
                        countriesDiv.style.left = left + "px";
                    }

                }
                
            }
        } else if (countries === false) {
            const countriesDiv = document.getElementById("countriesDiv");
            // top prevent data leak and slow aftermath rendering, remove button eventListeners
            // countriesDiv.style.display = "none";

            let buttons = countriesDiv.getElementsByTagName("BUTTON");
            if (buttons) {
                for (let x = 0; x < buttons.length; x++) {
                    buttons[x].removeEventListener("click", CountryClicked);
                }
            }
        }

    }, [countries])

    const countryChanged = event => {
        const parent = event.target.parentElement;
        const thisSpan = parent.querySelector("span");
        if (parent && thisSpan && event.target.value !== "") {
            // we make the placeholder transparent
            thisSpan.style.opacity = "0";
            event.target.style.border = "2px solid black";
            event.target.style.borderRadius = "8px";
        }
        if (event.target.value === "") {
            thisSpan.style.opacity = "1";
            event.target.style.border = "none";
            event.target.style.borderBottom = "2px solid #828282";
            event.target.style.borderRadius = 0;

        }
    }

    // cancel sign up
    const CancelSignUp = () => {
        window.location.pathname = "/"
    }

    return(
        <>
        <div class="signupModal" id="signupModal">
            <form class="card" action="http://localhost:8080/signup/submission" method="post" onSubmit={ValidateData}>
                <p class="signup">Retro Classics: Sign Up</p>

                <div className="mainForm">
                    <div className="left">
                        <div class="inputBox1">
                            <input type="text" name="Email" id="Email" required="required" />
                            <span class="user" >Email</span>
                        </div>

                        <div class="inputBox">
                            <input type="text" name="FullName" id="FullName" required="required" />
                            <span>Full name</span>
                        </div>

                        <div class="inputBox">
                            <input type="password" name="Password" id="Password" required="required" />
                            <span>Password</span>
                        </div>

                        <div class="inputBox">
                            <input type="password" name="ConfirmPassword" id="ConfirmPassword" required="required" />
                            <span>Confirm Password</span>
                        </div>

                    </div>

                    <div className="right">

                        <div class="inputBox1">
                            <select name="Country" id="Country" onChange={countryChanged} >
                                <option value=""></option>
                                <option value="Kenya">Kenya</option>
                                <option value="Nigeria">Nigeria</option>
                            </select>
                            <span class="user">Country</span>
                        </div>


                        <div class="inputBox1">
                            <input type="text" name="MobileNumber" id="MobileNumber" required="required" />
                            <span class="user">Mobile number</span>
                        </div>

                        <div className="hasAccount">
                            <span>Already have an account?</span>
                            <Link to="/login" id="shiftToLogin">Login.</Link>
                        </div>

                    </div>
                </div>

                <div className="buttonsDiv">
                    <button type="submit" className="submit">create account</button>
                    <button type="button" className="cancel" onClick={CancelSignUp} >Cancel</button>
                </div>

            </form>

            <div className="countriesDiv" id="countriesDiv"></div>

        </div>


        </>
    )
}

export default Signup;