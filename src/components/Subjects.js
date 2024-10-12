import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// component will display all available subjects
const Subjects = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect( () => {
        let subjectList = [
            {
                id: 1,
                title: "Mathematics",
            },
            {
                id: 2,
                title: "Business Studies",
            },
            {
                id: 3,
                title: "History",
            },
            {
                id: 4,
                title: "Geography",
            },
            {
                id: 5,
                title: "Natural Science",
            },
            {
                id: 6,
                title: "Life Science",
            },
            {
                id: 7,
                title: "English",
            },
            {
                id: 8,
                title: "Technology",
            },
            {
                id: 9,
                title: "Afrikaans",
            },
            {
                id: 10,
                title: "Life Skills",
            },
            {
                id: 11,
                title: "Computer Science",
            },
            {
                id: 12,
                title: "Other",
            },
            
            
        ];

        setSubjects(subjectList)
    }, []);
    return(

        <div>
            <h2 className="text-center">Subjects</h2> {/* .text-center */}
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