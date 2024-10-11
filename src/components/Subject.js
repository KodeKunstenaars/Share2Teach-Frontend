import { useParams } from "react-router-dom";

// this component will display all documents under specified subject category
const Subject = () => {
    
    // gets subject title from url
    let { title } = useParams();

    return(

        <div>
            <h2>{title}</h2>
            <hr />
        </div>
    
    )
}

export default Subject;