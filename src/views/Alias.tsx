import "../App.css";
import { Link } from "react-router-dom";

function Alias() {
    return (
        <div className="card">
            <div className="dialog">
                <h4 className="question">OK:</h4>
                <h4 className="answer">ifu, tala, sween</h4>
                <h4 className="question">AVOID:</h4>
                <h4 className="answer">ifui0, 9ifu, starboy, ifuxyl</h4>

            </div>
            <br />
            <div className="goto">
                <Link to="/">
                    <button>return</button>
                </Link>
            </div>

        </div>
    )
}

export default Alias
