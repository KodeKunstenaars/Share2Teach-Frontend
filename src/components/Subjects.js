import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// component will display all available subjects
const Subjects = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        let subjectList = [
            { id: 1, title: "Mathematics" },
            { id: 2, title: "Business Studies" },
            { id: 3, title: "History" },
            { id: 4, title: "Geography" },
            { id: 5, title: "Natural Science" },
            { id: 6, title: "Life Science" },
            { id: 7, title: "English" },
            { id: 8, title: "Technology" },
            { id: 9, title: "Afrikaans" },
            { id: 10, title: "Life Skills" },
            { id: 11, title: "Computer Science" },
            { id: 12, title: "Other" },
        ];

        setSubjects(subjectList);
    }, []);

    return (
        <div className="section fade-in">
            <h2 className="subject-title">Subjects</h2>
            <hr/>
            <div className="subject-container">
                {subjects.map((subject) => (
                    <div key={subject.id} className="subject-card">
                        <Link to={`/subjects/${subject.title}`} className="subject-link">
                            {subject.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Subjects;