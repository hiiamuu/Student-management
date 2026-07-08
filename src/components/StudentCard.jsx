const StudentCard = ({ student, onDelete, onEdit }) => {
    const { name, course, marks, isActive } = student;

    const isPassed = marks >= 40;

    return (
        <div className="rounded-xl bg-white p-5 shadow transition hover:shadow-lg">
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-semibold">{name}</h2>

                    <p className="text-sm text-gray-500">{course}</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit?.(student)}
                        className="rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
                    >
                        Edit
                    </button>

                    <button
                        onClick={onDelete}
                        className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-gray-700">
                    <span className="font-medium">Marks:</span> {marks}
                </p>
            </div>

            <div className="flex gap-2">
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                        isPassed
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {isPassed ? "Pass" : "Fail"}
                </span>

                {isActive && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        Active
                    </span>
                )}
            </div>
        </div>
    );
};

export default StudentCard;
