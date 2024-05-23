import "../App.css";
import { Link } from "react-router-dom";

function FAQ() {
    return (
        <div className="card">
            <div className="dialog">
                <h4 className="question">Q. Who are you?</h4>
                <h4 className="answer">A. Many hats-- but an artist, hobbyist, full-time dev.</h4>
                <h4 className="question">Q. What do you draw with?</h4>
                <h4 className="answer">A. Photoshop + MSPaint w/ mouse.</h4>
                <h4 className="question">Q. Sens/DPI?</h4>
                <h4 className="answer">A. Sens varies, but 800 DPI. Basically aim for 24.35in/360 (61.85cm/360) usually.</h4>
                <h4 className="question">Q. Any advice on developing an artstyle?</h4>
                <h4 className="answer">A. I'm a personal advocate in imitating your heroes. If you are inspired by someone's
                    art, it's okay to replicate their style or take parts of their artistic choices. As long as
                    you're having fun and learning something new, you'll develop your own consistency.</h4>
                <h4 className="question">Q. Recommended software?</h4>
                <h4 className="answer">A. For Windows: foobar2000, ffmpeg, NanaZip/7Zip, Obsidian, Soulseek, Syncthing, winget, yt-dlp.</h4>
                <h4 className="question">Q. Are you a furry?</h4>
                <h4 className="answer">A. Yeah.</h4>
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

export default FAQ
