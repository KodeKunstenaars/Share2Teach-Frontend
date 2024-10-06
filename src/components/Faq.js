import { useEffect, useState } from "react";

// component that will display the FAQ page
const Faq = () => {
    const [faq, setFaq] = useState([]);

    useEffect( () => {
        let faqList = [
            {
                question: "random question",
                answer: "answer to random question"
            },
        ];

        setFaq(faqList)
    }, []);
  // display the FAQ list
    return(
        <div>
            <h2>FAQ's</h2>
            <hr />
            <table className="table table-striped table-hover">
                <tbody>
                    {faq.map((m) => (
                        <tr key={m.id}>
                            <td>
                               <strong>{m.question}</strong> 
                               <p> {m.answer}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Faq;