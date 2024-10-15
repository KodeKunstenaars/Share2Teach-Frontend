import { Link } from 'react-router-dom';
import Library from './../images/Library.jpeg';
import '../styles/Home.css'; // Import the CSS file

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-image">
                <img src={Library} alt='Library' className="logo" />
            </div>
            <div className="home-text">
                <h2>Welcome to Share2Teach</h2>
            </div>
            <hr />
        </div>
    );
}

export default Home;
