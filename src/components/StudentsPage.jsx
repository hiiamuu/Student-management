import { useSearchParams } from "react-router-dom";

const StudentsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const course = searchParams.get("course") || "All";

    const handleCourseChange = (newCourse) => {
        setSearchParams({ course: newCourse });
    };

    return (
        <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
                Filtering by: <span className="font-medium text-gray-900">{course}</span>
            </p>
            <div className="flex gap-2">
                {["All", "BCA", "BSc IT", "BTech"].map((c) => (
                    <button
                        key={c}
                        onClick={() => handleCourseChange(c)}
                        className={`px-4 py-1.5 rounded-lg text-sm border transition cursor-pointer ${
                            course === c
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        {c}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StudentsPage;
