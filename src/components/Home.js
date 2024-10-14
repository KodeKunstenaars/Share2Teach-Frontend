import { Link } from 'react-router-dom';
import Library from './../images/Library.jpeg';
import '../styles/Home.css'; // Import the CSS file

// Mock data for recently viewed documents
// This should be populated with the actual viewed documents in your application
const recentlyViewedDocuments = [
    // Uncomment the lines below to simulate viewed documents
    // { id: 1, title: 'Document 1', link: '/documents/1' },
    // { id: 2, title: 'Document 2', link: '/documents/2' },
];

const Home = () => {
    return (
        <>
            <div className="home-header">
                <img src={Library} alt='Library' className="logo" />
                <h2>Welcome to Share2Teach</h2>
            </div>

            <hr />

            {/* Recently Viewed Documents Section */}
            <div className="recently-viewed">
                <h3>Recently Viewed Documents</h3>
                {recentlyViewedDocuments.length > 0 ? (
                    <ul className="document-list">
                        {recentlyViewedDocuments.map((doc) => (
                            <li key={doc.id}>
                                <Link to={doc.link} className="document-link">
                                    {doc.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recently viewed documents.</p> // Message when no documents are viewed
                )}
            </div>
        </>
    );
}

export default Home;
