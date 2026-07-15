import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import DeleteUserDialog from "./DeleteUserDialog";

const fetchUsers = async () => {
    const response = await fetch("http://localhost:3001/students");

    if (!response.ok) {
        throw new Error("Failed to fetch users.");
    }

    return response.json();
};

const UserList = () => {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    const handleView = (user) => {
        alert(`View: ${user.name}`);
        setOpenMenuId(null);
    };

    const handleUpdate = (user) => {
        alert(`Update: ${user.name}`);
        setOpenMenuId(null);
    };

    const handleDelete = (student) => {
        setSelectedStudent(student);
        setDeleteDialogOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                Loading...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center py-20 text-red-500">
                {error.message}
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-4 p-6">
                {user.map((student) => (
                    <div
                        key={student.id}
                        className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {student.name}
                                </h2>

                                <p className="text-sm text-gray-600">
                                    Course:{" "}
                                    <span className="font-medium">
                                        {student.course}
                                    </span>
                                </p>

                                <p className="text-sm text-gray-600">
                                    Marks:{" "}
                                    <span className="font-medium">
                                        {student.marks}
                                    </span>
                                </p>

                                <span
                                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                        student.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {student.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            <button
                                onClick={() =>
                                    setOpenMenuId(
                                        openMenuId === student.id
                                            ? null
                                            : student.id
                                    )
                                }
                                className="rounded-full p-1 hover:bg-gray-100"
                            >
                                <EllipsisVertical size={18} />
                            </button>
                        </div>

                        {openMenuId === student.id && (
                            <div className="absolute top-10 right-4 z-10 w-32 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                                <button
                                    onClick={() => handleView(student)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-gray-100"
                                >
                                    <Eye size={14} />
                                    View
                                </button>

                                <button
                                    onClick={() => handleUpdate(student)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-gray-100"
                                >
                                    <Pencil size={14} />
                                    Update
                                </button>

                                <button
                                    onClick={() => handleDelete(student)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <DeleteUserDialog
                open={deleteDialogOpen}
                student={selectedStudent}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setSelectedStudent(null);
                }}
            />
        </>
    );
};

export default UserList;
