import { useEffect, useState } from "react";
// import { MdRemoveRedEye } from "react-icons/md";
// import { Link } from "react-router-dom";
import "../App.css";
import namedCountries from "../scripts/countries";

const Signup = () => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [countries, setCountries] = useState(false);

    useEffect( () => {
        window.addEventListener( "click", windowClicked );
    }, [])

    // if you click the modal, then you are taken to the homepage
    const windowClicked = event => {
        if ( event.target.id.toLowerCase() === "signupmodal" ) {
            window.location.pathname = "/";
        }
    }

    // determined by a useEffect
    useEffect( () => {
        if(formIsValid){
            document.getElementsByTagName("form")[0].submit();
        }
    }, [formIsValid])

    const ValidateData = event => {
        if ( formIsValid ) {
            event.target.submit();
            return true;
        }
        // form validation is not true.
        event.preventDefault();
        
        // email format
        const email = document.getElementById("email").value;
        const indexOfAt = email.lastIndexOf("@");
        if ((email.length - indexOfAt) < 5) {
            alert("There must be at least 4 characters after '@' in your email.")
            return;
        }

        let dotsInEmail = [];
        for ( let i = indexOfAt; i < email.length; i++ ) {
            if (email[i] === "." ) {
                dotsInEmail += email[i];
            }
        }
        if ( dotsInEmail.length === 0 ) {
            alert("Your email appears to be wrong. There must be a dot somewhere after '@'.")
            return;
        }
        
        // name ==> check if there are only 2 names
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
        
        mobileNumber = parseFloat(mobileNumber);
        mobileNumber = "0" + mobileNumber;
        mobileNumber = mobileNumber.toString();
        if(mobileNumber.length !== 10) {
            alert("A mobile number can only be in digits.");
            return;
        }

        setFormIsValid(true);

    }

    useEffect( () => {
        const signupModal = document.getElementById("signupModal");
        const countriesDiv = document.getElementById("countriesDiv");
        if (countries) {
            countriesDiv.style.display = "flex";
            if (signupModal && countriesDiv) {
                for (let int = 0; int < namedCountries.length; int++) {
                    const button = document.createElement("button")
                    button.setAttribute("type", "button");
                    button.innerHTML = namedCountries[int].name;
                }
            }
        } else{
            countriesDiv.style.display = "";
        }


    }, [countries])

    return(
        <>
        <div class="signupModal" id="signupModal">
            <form class="card" action="http://localhost/signup/submission/" onSubmit={ValidateData}>
                <p class="signup">Sign Up</p>

                <div className="mainForm">
                    <div className="left">
                        <div class="inputBox1">
                            <input type="text" required="required" />
                            <span class="user" name="Email" id="Email" >Email</span>
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
                            <input type="text" name="Country" id="Country" onFocus={() => setCountries(true)} required="required" />
                            <span class="user">Country</span>
                        </div>
                        <div class="inputBox1">
                            <input type="text" name="MobileNumber" id="MobileNumber" required="required" />
                            <span class="user">Mobile number</span>
                        </div>

                    </div>
                </div>

                <button type="submit" class="submit">create account</button>

            </form>

            <div className="countriesDiv" id="countriesDiv"></div>

        </div>


        </>
    )
}

export default Signup;