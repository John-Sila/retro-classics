import { Link } from "react-router-dom";
import "../App.css";
import { useEffect, useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    useEffect( () => {
        const passwordInput = document.getElementById("loginPassword");
        if (showPassword) {
            passwordInput.setAttribute("type", "text");
        } else {
            passwordInput.setAttribute("type", "password");
        }
    }, [showPassword]);
    
    useEffect( () => {
        window.addEventListener( "click", windowClicked );
    }, []);
    
    const windowClicked = event => {
        if( event.target.id.toLowerCase() === "loginmodal" ) {
            window.location.pathname = "/";
        }
    }

    return(
        <>
            <div className="loginModal" id="loginModal">
                <form action="http://localhost:8080/login/submission" method="post" id="loginForm" className="loginFormPC">
                    <h3>Retro Classics</h3>
                    <label>
                        E-Mail:<br />
                        <input type="email" name="email" id="loginEmail" required />
                    </label>
                    <label>
                        Password:<br />
                        <input type="password" name="password" id="loginPassword" required />
                        <button onClick={() => setShowPassword(!showPassword)} className="eye"><MdRemoveRedEye/></button>
                    </label>
                    <button type="Submit">Login</button>
                    <p>Don't have an account?</p>
                    <Link to="/signup" className="goToSignup">Create Account.</Link>
                    <div className="finishLogin">
                        <button type="button" onClick={ () => window.location = "/" }>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;