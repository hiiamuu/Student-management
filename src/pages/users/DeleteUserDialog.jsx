import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent } from "../../api/studentApi";

const DeleteUserDialog = ({ open, student, onClose, refreshStudents }) => {
    if (!open || !student) return null;

    const queryClient = useQueryClient();
    const onDelete = async () => {
        try {
            await deleteStudent(student.id);

            await refreshStudents();
        } catch (error) {
            console.error(error);
        }
    };

    const { mutate, isPending } = useMutation({
        mutationFn: onDelete,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["users"]});
            onClose();
        },
        onError: (error) => {
            console.error(error);
            onClose();
        }
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h2 className="text-xl font-semibold text-red-600">
                        Delete Student
                    </h2>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                    <p className="text-gray-700">
                        Are you sure you want to delete
                        <span className="font-semibold"> {student.name}</span>?
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        This action cannot be undone.
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => mutate()}
                        disabled={isPending}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserDialog;
