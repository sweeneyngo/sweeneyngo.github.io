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
                <h4 className="question">Q. Who is ifu & tala?</h4>
                <h4 className="answer">A. Simply put, they're my OCs.
                    <br /> "ifu" is my spirtual successor as a human/deer hybrid. I'm still in the process of redesigning them, but they are VERY similar to my previous sona.
                    <br />
                    "tala" is my other fursona who is wolven/canine, but I consider them as a
                    {" "}<a href="https://www.youtube.com/watch?v=lNdMyz7BHe8">pseudo-soulmate</a> to ifu, rather than my identity.
                    To be honest, it's hard to definitively distance myself from "tala" since they both represent my
                    love for Cervidaes & Canines (yin/yang), so I don't correct anyone for using either.</h4>
                <h4 className="question">Q. Explain pseudo-soulmate.</h4>
                <h4 className="answer">A. In other words, not a romantic partner, but beyond love itself. Like different sides of the same coin. A person's shadow. Spirtually connected as one. A shared co-existence. Love can be used to express it, but it does not define it.
                    <br />
                    <br />
                    Romantically, ifu is interested in a certain white doggo, so no conflicts there!
                </h4>
                <h4 className="question">Q. Recommended software?</h4>
                <h4 className="answer">A. For Windows: foobar2000, ffmpeg, NanaZip/7Zip, Obsidian, Soulseek, Syncthing, winget, yt-dlp.</h4>
                <h4 className="question">Q. Do you accept followers?</h4>
                <h4 className="answer">A. Yes and no. I will only accept followers whose work/talent I currently am inspired by.
                    So if you're a close friend/loved one, the answer is no.
                    Besides, I'd rather talk to y'all in chats anyway, social media's not the place for that.</h4>
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
