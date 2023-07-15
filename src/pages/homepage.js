import { useEffect, useState } from "react";
import "../App.css";
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Slideshow from "../images/Slideshow";

const Homepage = () => {

    var [slideshowIndex, setSlideshowIndex] = useState(0);
    const nextSlideshow = slideshowIndex < Slideshow.length - 1;

    // Date for a certain sentence in homepage
    useEffect( () => {
        const date = new Date();
        const year = date.getFullYear();
        const period = parseFloat(year) - 2019;
        document.getElementById("businessYears").innerHTML = period;
    }, [])

    // the slideshow at homepage
    useEffect( () => {
        const slideShowDiv = document.getElementById("slideshowdiv");
        const Image = slideShowDiv.querySelector("#slideshowImage");
        if (Image) {
            // if there is something next after the image
            Image.setAttribute("src", Slideshow[slideshowIndex].url);
        }
        
    }, [slideshowIndex])
    
    // when the page loads, set the dots for slideshow
    useEffect( () => {
        for (let int = 0; int < Slideshow.length; int++) {
            const dotsDiv = document.getElementById("slideshowDots");
            const dot = document.createElement("div");
            dot.classList.add('dots');
            dotsDiv.appendChild(dot);
        }
    }, [])

    setTimeout(() => {
        if (nextSlideshow) {
            setSlideshowIndex( () => slideshowIndex + 1)
            return
        }
        setSlideshowIndex( () => slideshowIndex = 0 );
    }, 3000);

    return (
        <div className="renderDivs homePage" id="renderDivsHome">
            <div className="slideshowdiv" id="slideshowdiv">
                <div className="leftOfSlideshow" id="leftOfSlideshow">
                    <img src="" alt="" id="slideshowImage"/>
                    <div id="slideshowDots" className="slideshowDots"></div>
                </div>
            </div>

            <p>
                Welcome to <i>Retro Classics</i>, where we celebrate the beauty and history of timeless treasures.
            </p>

            
            <p>Our passion for antiques drives us to curate a remarkable collection that showcases the craftsmanship and stories of the past.</p>

            <p>
                With over <span id="businessYears"></span> years of experience in the antique industry, we have developed a keen eye for extraordinary pieces.
            </p>

            <p>
            Our team of experts meticulously selects each item, ensuring that it meets our high standards of quality, authenticity, and historical significance.
            </p>


            <p>
                You can choose to buy from <a href="">our shop</a> or from our <a href="">C2C platform</a> where buyers meet sellers from all of East Africa.
            </p>

            <p>
                Visit out <a href="/marketplace">marketplace</a> for our general and official market.
            </p>


            <p>
                Explore our captivating collection of antique furniture and houseware, where every piece tells a unique tale.
            </p>

            <p>
                From the ornate carvings of a Victorian-era dining table to the elegant lines of an Art Deco armchair, our featured items exude charm and character.
            </p>


            <p>
                All types of antiques, retros and vintage products at your reach.
            </p>

            <p>
                In addition to our curated collection, we offer expert restoration services to breathe new life into beloved antiques.
            </p>

            <p>
                Our skilled craftsmen employ traditional techniques to preserve the integrity and beauty of each piece, ensuring it retains its value and allure.
            </p>


            <p>
                We invite you to start your journey into the world of antiques by browsing our online collection.
            </p>

            <p>
                Feel free to contact us for inquiries, consultations, or to schedule an appointment to visit our showroom.
            </p>

            <p>
                <a href="">Join our newsletter</a> to stay updated on the latest additions and exclusive offers.
            </p>


            <p>
                At Retro Classics, we are driven by our passion for antiques and the stories they hold.
            </p>

            <p>
                We believe in preserving history and sharing the joy of owning unique pieces that carry the whispers of the past.
            </p>

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