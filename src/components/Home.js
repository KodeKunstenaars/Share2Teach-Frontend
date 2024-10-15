import { Link } from 'react-router-dom';
import Library from './../images/Library.jpeg';
import '../styles/Home.css'; // Import the CSS file

const Home = () => {
    return (
        <>
            <div className="home-header">
                <img src={Library} alt='Library' className="logo" />
                <h2>Welcome to Share2Teach</h2>
            </div>

            <hr />

            {/* Recently Viewed Documents section removed */}
        </>
    );
}

export default Home;
