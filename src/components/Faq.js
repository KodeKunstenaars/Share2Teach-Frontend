import { useEffect, useState } from "react";

// component that will display the FAQ page
const Faq = () => {
    const [faq, setFaq] = useState([]);

    useEffect(() => {
        let faqList = [
            {
                question: "random question",
                answer: "answer to random question",
                id: 1, // Add an ID for each FAQ item
            },
        ];

        setFaq(faqList);
    }, []);
    
    // display the FAQ list
    return (
        <div>
            <h2 className="text-center">FAQ</h2> {/* .text-center */}
            <hr />
            <table className="table table-striped table-hover">
                <tbody>
                    {faq.map((m) => (
                        <tr key={m.id}>
                            <td>
                                <strong>{m.question}</strong>
                                <p>{m.answer}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Faq;
