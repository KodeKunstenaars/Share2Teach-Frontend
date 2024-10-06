import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// this component will display all documents under specified subject category
const Subject = () => {
    const [subject, setSubject] = useState({});
    // gets subject title from url
    let { title } = useParams();

    useEffect(() => {
        let mySubject =  {
            title: "Mathematics",
        }

        setSubject(mySubject);
    }, [title])
    return(

        <div>
            <h2>{subject.title}</h2>
            <hr />
        </div>
    
    )
}

export default Subject;