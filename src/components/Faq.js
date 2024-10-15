import React, { useState, useEffect } from 'react';

function FAQ() {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        // Use the full URL of your backend API
        fetch('http://localhost:8080/faqs') // Update with your actual backend URL
            .then(response => response.json())
            .then(data => setFaqs(data))
            .catch(error => console.error('Error fetching FAQs:', error));
    }, []);

    return (
        <div>
            <h2 className="text-center">FAQ</h2> {/* .text-center */}
            <ul>
                {faqs.map(faq => (
                    <li key={faq.id}>
                        <strong>{faq.question}</strong>
                        <p>{faq.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FAQ;
