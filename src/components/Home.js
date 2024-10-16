import React from 'react';
import Search from './Search';

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

        
        window.location.href = `/search?${params.toString()}`;
    };

    return (
        <div className="text-center">
            <h2 className="subject-title">Welcome to Share2Teach</h2>
            <hr/>
            <div className="d-flex justify-content-center mt-4">
                <div className="w-75 search-bar"> 
                    <Search onSearch={handleSearch}/>
                </div>
            </div>
        </div>
    );
};

export default Home;