import "../App.css";
import { Link } from "react-router-dom";

const Nopage = () => {
    return (
        <>
            <div className="renderDivs">
                <h2>Error 404.</h2>
                <h5>Page not found :( !</h5>
                <p>Go to <Link to="/">homepage</Link></p>
            </div>
        </>
    )
}

export default Nopage;