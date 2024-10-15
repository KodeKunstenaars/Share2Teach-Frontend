import React, { useState, useEffect } from 'react';
import '../styles/Faq.css'; // Import the updated CSS

function FAQ() {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/faqs') // Replace with your actual backend URL
            .then(response => response.json())
            .then(data => setFaqs(data))
            .catch(error => console.error('Error fetching FAQs:', error));
    }, []);

    const toggleFAQ = index => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h2 className="faq-heading">FAQ</h2> {/* .text-center */}
            <ul>
                {faqs.map((faq, index) => (
                    <li key={faq.id} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                            {faq.question}
                        </div>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FAQ;
