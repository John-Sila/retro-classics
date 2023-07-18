import { useEffect, useState } from "react";
import "../App.css";
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Slideshow from "../images/Slideshow";

const Homepage = () => {

    var [slideshowIndex, setSlideshowIndex] = useState(0); /**which image are we showing? */
    const nextSlideshow = slideshowIndex < Slideshow.length - 1; /**is there a next? */

    // // Date for a certain sentence in homepage
    // useEffect( () => {
    //     const date = new Date();
    //     const year = date.getFullYear();
    //     const period = parseFloat(year) - 2019;
    //     document.getElementById("businessYears").innerHTML = period;
    // }, [])

    
    // the slideshow at homepage
    useEffect( () => {
        const slideShowDiv = document.getElementById("slideshowdiv");
        const Image = slideShowDiv.querySelector("#slideshowImage");
        Image.classList.add("slideImages");
        if (Image) {
            // if there is something like an image in that div
            Image.setAttribute("src", Slideshow[slideshowIndex].url);
        }

        setTimeout(() => {
            Image.style.opacity = "1";  
        }, 250);
        setTimeout(() => {
            Image.style.opacity = "1";
        }, 5000);
        setTimeout(() => {
            Image.style.opacity = "0";
        }, 6000);

        setTimeout(() => {
            if (nextSlideshow) {
                setSlideshowIndex(slideshowIndex + 1)
                return
            }
            setSlideshowIndex(0);
        }, 7000);

    }, [slideshowIndex, nextSlideshow])
    

    // when the page loads, set the dots for slideshow
    useEffect( () => {
        for (let int = 0; int < Slideshow.length; int++) {
            const dotsDiv = document.getElementById("slideshowDots");
            const dot = document.createElement("div");
            dot.classList.add('dots');
            dotsDiv.appendChild(dot);
        }
    }, [])

    // to relay an active style to the slide show dots
    useEffect( () => {
        const dotsDiv = document.getElementById("slideshowDots");
        if (dotsDiv) {
            const dots = document.getElementsByClassName("dots");
            if (dots) {
                for (let int = 0; int < dots.length; int++) {
                    dots[int].classList.remove("activeSlide");
                    dots[slideshowIndex].classList.add("activeSlide");
                    dots[int].classList.remove("bordersActive");
                    
                    /**if there is a next image...also if there is an image at the back */
                    if (nextSlideshow && slideshowIndex !== 0) {
                        dots[slideshowIndex + 1].classList.add("bordersActive");
                        dots[slideshowIndex - 1].classList.add("bordersActive");
                    }
                    // if this is the last slide
                    if (!nextSlideshow) {
                        dots[slideshowIndex - 1].classList.add("bordersActive");
                    }
                    // if this is the first slide
                    if (slideshowIndex === 0) {
                        dots[1].classList.add("bordersActive");
                    }
                }
            }
        }
    }, [slideshowIndex, nextSlideshow])
    

    return (
        <div className="renderDivs homePage" id="renderDivsHome">

            { /**begin with the slideshow */ }
            <div className="slideshowdiv" id="slideshowdiv">
                <div className="leftOfSlideshow" id="leftOfSlideshow">
                    <img src="" alt="" id="slideshowImage"/>
                    <div id="slideshowDots" className="slideshowDots"></div>
                </div>
            </div>

            { /**then a hero image section */ }
            <div className="heroImage" id="heroImage">
                
            </div>

            <footer>
                <div id="footer1">
                    <p>About us</p>
                    <a href="">About Retro Classics</a>
                    <a href="">Terms & Conditions</a>
                    <a href="">Privacy Policy</a>
                    <a href="">Billing</a>
                    <a href="">Copyrights</a>
                </div>

                <div id="foter2">
                    <p>Support</p>
                    <a href="mailto:retroclassics@support.ac.ke">support@retroclassics.co.ke</a>
                    <a href="">Contacts Us</a>
                    <a href="">FAQ</a>
                </div>

                <div id="footer3">
                    <p>Social Media</p>
                    <a href="" title="Instagram"><FaInstagram /></a>
                    <a href="" title="Twitter"><FaTwitter /></a>
                    <a href="" title="Twitter"><FaLinkedin /></a>
                    <a href="" title="Facebook"><MdFacebook /></a>
                </div>
            </footer>

        </div>
    )
}

export default Homepage;