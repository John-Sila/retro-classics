import { useEffect } from "react";
import "../App.css";
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Homepage = () => {

    useEffect( () => {
        const date = new Date();
        const year = date.getFullYear();
        const period = parseFloat(year) - 2019;
        document.getElementById("businessYears").innerHTML = period;
    }, [])

    return (
        <div className="renderDivs homePage" id="renderDivsHome">
            <p>
                Welcome to <i>Retro Classics</i>, where we celebrate the beauty and history of timeless treasures.
            </p>

            <p>
                Our passion for antiques drives us to curate a remarkable collection that showcases the craftsmanship and stories of the past.
            </p>

            <img src="https://cdn.pixabay.com/photo/2014/09/05/18/32/old-books-436498_1280.jpg" alt="Old Books" />

            <p>
                With over <span id="businessYears"></span> years of experience in the antique industry, we have developed a keen eye for extraordinary pieces.
            </p>

            <p>
            Our team of experts meticulously selects each item, ensuring that it meets our high standards of quality, authenticity, and historical significance.
            </p>

            <img src="https://cdn.pixabay.com/photo/2015/04/07/14/27/camera-711025_1280.jpg" alt="Vintage Camera" />

            <p>
                You can choose to buy from <a href="">our shop</a> or from our <a href="">C2C platform</a> where buyers meet sellers from all of East Africa.
            </p>

            <p>
                Visit out <a href="/market">marketplace</a> for our general and official market.
            </p>

            <img src="https://cdn.pixabay.com/photo/2016/05/28/07/06/writer-1421099_1280.jpg" alt="Type writer" />

            <p>
                Explore our captivating collection of antique furniture and houseware, where every piece tells a unique tale.
            </p>

            <p>
                From the ornate carvings of a Victorian-era dining table to the elegant lines of an Art Deco armchair, our featured items exude charm and character.
            </p>

            <img src="https://cdn.pixabay.com/photo/2014/09/23/20/19/castle-458058_1280.jpg" alt="Living room decor" />

            <p>
                All types of antiques, retros and vintage products at your reach.
            </p>

            <p>
                In addition to our curated collection, we offer expert restoration services to breathe new life into beloved antiques.
            </p>

            <p>
                Our skilled craftsmen employ traditional techniques to preserve the integrity and beauty of each piece, ensuring it retains its value and allure.
            </p>

            <img src="https://cdn.pixabay.com/photo/2017/02/14/16/46/room-2066402_1280.jpg" alt="Antique coach pattern" />

            <p>
                We invite you to start your journey into the world of antiques by browsing our online collection.
            </p>

            <p>
                Feel free to contact us for inquiries, consultations, or to schedule an appointment to visit our showroom.
            </p>

            <p>
                <a href="">Join our newsletter</a> to stay updated on the latest additions and exclusive offers.
            </p>

            <img src="https://cdn.pixabay.com/photo/2017/08/20/20/57/clock-2663148_1280.jpg" alt="Desk" />

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