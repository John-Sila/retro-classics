import { Link } from "react-router-dom";
import "../App.css";
import { useEffect, useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";

const Login = () => {

    // const [showPassword, setShowPassword] = useState(false);
    // useEffect( () => {
    //     const passwordInput = document.getElementById("loginPassword");
    //     if (showPassword) {
    //         passwordInput.setAttribute("type", "text");
    //     } else {
    //         passwordInput.setAttribute("type", "password");
    //     }
    // }, [showPassword]);
    
    useEffect( () => {
        window.addEventListener( "click", windowClicked );
    }, []);
    
    const windowClicked = event => {
        if( event.target.id.toLowerCase() === "mainlog" ) {
            window.location.pathname = "/";
        }
    }

    // cancel login
    const CancelLogin = () =>{
        window.location.pathname = "/";
    }

    return(
        <>
            <div className="mainLog" id="mainLog">
                <div className="loginModal" id="loginModal">
                    <span><h4>Retro Classics</h4></span>
                    <form action="http://localhost:8080/login/submission" method="post" id="loginForm" className="">
                        <div class="loginFormPC">
                            <input type="text" name="" required />
                            <label>Username</label>
                        </div>

                        <div class="loginFormPC">
                            <input type="password" name="" required />
                            <label>Password</label>
                        </div>

                        <span>Don't have an account?</span>
                        <span><a href="/signup">Create Account.</a></span>

                        <div className="loginButtons">
                            <button type="submit">submit<span></span></button>
                            <button type="button" onClick={CancelLogin}>Cancel<span></span></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;