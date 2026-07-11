import { useEffect, useState } from "react";
import { getStudents } from "./api/studentApi";

import StudentCard from "./components/StudentCard";
import StudentDialog from "./components/StudentDialog";
import DeleteDialog from "./components/DeleteDialog";
import MyForm from "./components/MyForm";

const FILTERS = ["All", "Pass", "Fail"];

function App() {
    const [students, setStudents] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");

    const [openStudentDialog, setOpenStudentDialog] = useState(false);

    const [selectedStudent, setSelectedStudent] = useState(null);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const filteredStudents = students
        .filter((student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((student) => {
            if (filter === "Pass") return student.marks >= 40;
            if (filter === "Fail") return student.marks < 40;
            return true;
        });

    const totalStudents = students.length;

    const passedStudents = students.filter(
        (student) => student.marks >= 40
    ).length;

    const averageMarks =
        totalStudents > 0
            ? (
                  students.reduce((sum, student) => sum + student.marks, 0) /
                  totalStudents
              ).toFixed(1)
            : 0;

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <header className="bg-slate-900 py-5 text-white shadow">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
                        <h1 className="text-3xl font-bold">Student Manager</h1>

                        <button
                            onClick={() => setOpenStudentDialog(true)}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                        >
                            + Add Student
                        </button>
                    </div>
                </header>

                <div className="mx-auto max-w-6xl p-6">
                    {/* Dashboard */}

                    <div className="mb-8 grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-blue-100 p-5 shadow">
                            <p>Total Students</p>
                            <h2 className="text-3xl font-bold">
                                {totalStudents}
                            </h2>
                        </div>

                        <div className="rounded-lg bg-green-100 p-5 shadow">
                            <p>Passed</p>
                            <h2 className="text-3xl font-bold text-green-700">
                                {passedStudents}
                            </h2>
                        </div>

                        <div className="rounded-lg bg-purple-100 p-5 shadow">
                            <p>Average Marks</p>
                            <h2 className="text-3xl font-bold">
                                {averageMarks}
                            </h2>
                        </div>
                    </div>

                    {/* Search */}

                    <div className="mb-8 flex flex-wrap gap-4">
                        <input
                            type="text"
                            placeholder="Search Student..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-72 rounded-lg border p-2"
                        />

                        {FILTERS.map((item) => (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`rounded-lg px-5 py-2 ${
                                    filter === item
                                        ? "bg-blue-600 text-white"
                                        : "border bg-white"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Cards */}

                    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {filteredStudents.map((student) => (
                            <StudentCard
                                key={student.id}
                                student={student}
                                onDelete={() => {
                                    setSelectedStudent(student);
                                    setOpenDeleteDialog(true);
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Add Student Dialog */}

                <StudentDialog
                    open={openStudentDialog}
                    onClose={() => setOpenStudentDialog(false)}
                    refreshStudents={fetchStudents}
                />

                {/* Delete Dialog */}

                <DeleteDialog
                    open={openDeleteDialog}
                    student={selectedStudent}
                    onClose={() => setOpenDeleteDialog(false)}
                    refreshStudents={fetchStudents}
                />
            </div>
            <MyForm />
        </>
    );
}

export default App;
