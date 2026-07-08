import { useState } from "react";
import { createStudent } from "../api/studentApi";

const StudentForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        course: "",
        marks: "",
        isActive: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.course.trim() ||
            formData.marks === ""
        ) {
            alert("Please fill all fields.");
            return;
        }

        const student = {
            ...formData,
            marks: Number(formData.marks),
        };

        try {
            await createStudent(student);

            setFormData({
                name: "",
                course: "",
                marks: "",
                isActive: false,
            });

            onSuccess();
        } catch (error) {
            console.error(error);
            alert("Failed to create student.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="mb-1 block font-medium">
                    Student Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-2"
                    placeholder="Enter student name"
                />
            </div>

            <div>
                <label className="mb-1 block font-medium">
                    Course
                </label>

                <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-2"
                    placeholder="Enter course"
                />
            </div>

            <div>
                <label className="mb-1 block font-medium">
                    Marks
                </label>

                <input
                    type="number"
                    name="marks"
                    value={formData.marks}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-2"
                    placeholder="Enter marks"
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    id="isActive"
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                />

                <label htmlFor="isActive">Active Student</label>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                    Save Student
                </button>
            </div>
        </form>
    );
};

export default StudentForm;