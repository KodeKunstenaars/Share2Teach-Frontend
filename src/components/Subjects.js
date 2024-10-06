import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// component will display all available subjects
const Subjects = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect( () => {
        let subjectList = [
            {
                title: "Mathematics",
            },
            {
                title: "Business Studies",
            },
            {
                title: "History",
            },
            {
                title: "Geography",
            },
            {
                title: "Natural Science",
            },
            {
                title: "Life Science",
            },
            {
                title: "English",
            },
            {
                title: "Technology",
            },
            {
                title: "Afrikaans",
            },
            {
                title: "Life Skills",
            },
            {
                title: "Computer Science",
            },
            {
                title: "Other",
            },
            
            
        ];

        setSubjects(subjectList)
    }, []);
    return(

        <div>
            <h2>Subjects</h2>
            <hr />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Subject</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((m) => (
                        <tr key={m.id}>
                            <td>
                                <Link to= {`/subjects/${m.title}`}>
                                    {m.title}
                                </Link>
                            </td>
                        </tr>    
                    ))}
                </tbody>
            </table>

        </div>
    
    )
}

export default Subjects;