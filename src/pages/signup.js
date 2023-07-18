import { useEffect, useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import "../App.css";

const Signup = () => {
    // check git merge

    const [formIsValid, setFormIsValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect( () => {
        window.addEventListener( "click", windowClicked );
    }, [])

    const windowClicked = event => {
        if ( event.target.id.toLowerCase() === "signupmodal" ) {
            window.location.pathname = "/";
        }
    }

    if(formIsValid){
        document.getElementsByTagName("form")[0].submit();
    }

    const passwordText = () => {
        setShowPassword(!showPassword);
    }

    const ValidateData = event => {
        if ( formIsValid ) {
            event.target.submit();
            return true;
        }
        // form validation is not true.
        event.preventDefault();
        
        // name
        var name = document.getElementById("name").value;
        let spaces = [];
        
        for (let i = 0; i < name.length; i++) {
            const element = name[i];
            if ( element === " " ) {
                spaces += element;
            }
        }

        if (spaces.length !== 1 ) {
            alert("Name must be 2 names.");
            return;
        }

        // username
        const username = document.getElementById("username").value;
        username.trim();
        if (username === "") {
            alert("Username cannot be empty.")
            return;
        }
        if (username.length < 6) {
            alert("At least 6 characters are need for username.")
            return;
        }

        // password
        const confirmpassword = document.getElementById("confirmpassword").value;
        const password = document.getElementById("password").value;
        if ( password.length < 7 ) {
            alert("Password must be at least 7 characters long.");
            return;
        }
        if (confirmpassword !== password) {
            alert("Password confirmation was wrong.")
            return;
        }

        // country
        const selectCountry = document.getElementById("selectCountry").value;
        if (selectCountry === "null") {
            alert("Choose country.")
            return;
        }

        // email
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

        // mobile number
        let mobileNumber = document.getElementById("mobileNumber").value;
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

    const checkEmailAvailability = event => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/email/availability");
        xhr.onreadystatechange = () => {
            if ( xhr.readystate === 4 && xhr.status === 200 ) {
                if ( xhr.responseText.toLocaleLowerCase() === "present" ) {
                    alert("E-Mail exists.")
                    return;
                }
            }
        }
        const emailInput = JSON.stringify(event.target.value)
        xhr.send(emailInput)

    }

    return(
        <>
            {/* <div className="signupModal" id="signupModal">
                <form onSubmit={ValidateData} action="http://localhost:8080/signup/submission" method="post" id="signupForm" className="signupFormPC">
                    <div className="signupLeft">
                        <label>
                            Name:<br />
                            <input type="text" name="name" id="name" required/>
                        </label>
                        <label>
                            E-Mail:<br />
                            <input type="email" name="email" id="email" onBlur={checkEmailAvailability} required/>
                        </label>
                        <label>
                            Password:<br />
                            <input type={showPassword ? "text" : "password"} name="password" id="password" required />
                            <button onClick={passwordText} className="eye"><MdRemoveRedEye/></button>
                        </label>
                        <label>
                            Confirm Password:<br />
                            <input type="password" name="" id="confirmpassword" required />
                        </label>
                    </div>
                    <div className="signupRight">
                        <label>
                            Country:<br />
                            <select name="country" id="selectCountry">
                                <option value="null">Choose country</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="South Africa">South Africa</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Sudan">Sudan</option>
                            </select>
                        </label>
                        <label>
                            Preferred Username:<br />
                            <input type="text" name="username" id="username" required />
                        </label>
                        <label>
                            Mobile Phone:<br />
                            <input type="text" name="mobilenumber" id="mobileNumber" required/>
                        </label>

                        <div className="hasSignupButtons">
                            <button type="submit">Create Account</button>
                            <button type="button" className="cancelSignup" onClick={ () => { window.location = "/" } }>Cancel</button>
                        </div>
                        <p>Already have an account?</p>
                        <Link to="/login" className="goToLogin">Login.</Link>
                    </div>
                </form>
            </div> */}


        <div class="signupModal">
            <form class="card">
                <a class="signup">Sign Up</a>

                <div className="mainForm">
                    <div className="left">
                        <div class="inputBox1">
                            <input type="text" required="required" />
                            <span class="user">Email</span>
                        </div>

                        <div class="inputBox">
                            <input type="text" required="required" />
                            <span>Username</span>
                        </div>

                        <div class="inputBox">
                            <input type="password" required="required" />
                            <span>Password</span>
                        </div>

                        <div class="inputBox">
                            <input type="password" required="required" />
                            <span>Confirm Password</span>
                        </div>

                    </div>

                    <div className="right">
                        <div class="inputBox1">
                            <input type="text" required="required" />
                            <span class="user">Country</span>
                        </div>
                        <div class="inputBox1">
                            <input type="text" required="required" />
                            <span class="user">Mobile number</span>
                        </div>

                    </div>
                </div>

                <button type="submit" class="submit">create account</button>

            </form>
        </div>


        </>
    )
}

export default Signup;