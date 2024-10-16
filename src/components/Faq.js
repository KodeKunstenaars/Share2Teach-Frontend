import React, { useState, useEffect } from 'react';
import '../styles/collapse.css'; // Import your CSS

function FAQ() {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null); // Track the active index

    useEffect(() => {
        fetch('http://localhost:8080/faqs') // Replace with your actual backend URL
            .then(response => response.json())
            .then(data => setFaqs(data))
            .catch(error => console.error('Error fetching FAQs:', error));
    }, []);

    const toggleFAQ = index => {
        // Toggle the clicked question: close if active, open if not
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h2 className="subject-title">FAQ's</h2>
            <hr />
            <ul className="faq-list">
                {faqs.map((faq, index) => (
                    <li key={faq.id} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                            {faq.question}
                        </div>
                        {/* Conditionally render the answer based on whether it's active */}
                        <div className="faq-answer" style={{ maxHeight: activeIndex === index ? '500px' : '0' }}>
                            <p>{faq.answer}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FAQ;
