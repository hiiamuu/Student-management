import StudentForm from "./StudentForm";

const StudentDialog = ({ open, onClose, refreshStudents }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-xl text-blue-600 font-semibold">
                        Add Student
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-red-500"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <StudentForm
                        onSuccess={() => {
                            refreshStudents();
                            onClose();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentDialog;