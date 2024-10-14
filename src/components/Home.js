import React from 'react';
import Search from './Search'; // Assuming you have a Search component already

const Home = () => {
    // Function to handle the search
    const handleSearch = (title, subject, grade) => {
        const params = new URLSearchParams();
        if (title.trim() !== "") {
            params.append("title", title.trim());
        }
        if (subject.trim() !== "") {
            params.append("subject", subject.trim());
        }
        if (grade.trim() !== "") {
            params.append("grade", grade.trim());
        }

        // Assuming you're using React Router's `navigate` function here to handle the search
        window.location.href = `/search?${params.toString()}`;
    };

    return (
        <div className="text-center">
            <h2>Welcome to Share2Teach</h2>
            <hr />
            {/* Add a large search bar like Google */}
            <div className="d-flex justify-content-center mt-4">
                <div className="w-75">
                    <Search onSearch={handleSearch} />
                </div>
            </div>
        </div>
    );
};

export default Home;