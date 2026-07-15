import { useLocation, useParams } from "react-router-dom";

const StudentDetailPage = () => {
    const { id } = useParams();
    const location = useLocation();
   
    return (
        <>
            <h2 className="text-xl font-semibold">Student ID: {id}</h2>
            <p>
                Current path:{" "}
                <span className="font-medium text-gray-700">
                    {location.pathname}
                </span>
            </p>
        </>
    );
};

export default StudentDetailPage;
