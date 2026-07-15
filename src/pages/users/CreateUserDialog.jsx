import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "../../api/studentApi";

const CreateUserDialog = ({ onSuccess }) => {
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: "",
        course: "",
        marks: "",
        isActive: false,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createStudent,

        onSuccess: () => {
            // Refresh the students list
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });

            // Reset form
            setFormData({
                name: "",
                course: "",
                marks: "",
                isActive: false,
            });

            // Close dialog if parent passed a callback
            onSuccess?.();
        },

        onError: (error) => {
            console.error(error);
            alert("Failed to create user.");
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.course.trim() ||
            formData.marks === ""
        ) {
            alert("Please fill all fields.");
            return;
        }

        mutate({
            name: formData.name.trim(),
            course: formData.course.trim(),
            marks: Number(formData.marks),
            isActive: formData.isActive,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="mb-1 block font-medium">
                    User Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter user name"
                    className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500"
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
                    placeholder="Enter course"
                    className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500"
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
                    placeholder="Enter marks"
                    className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500"
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

                <label htmlFor="isActive">
                    Active User
                </label>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                >
                    {isPending ? "Saving..." : "Save User"}
                </button>
            </div>
        </form>
    );
};

export default CreateUserDialog;