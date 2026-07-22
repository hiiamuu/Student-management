import React, { useState } from "react";
import UserList from "@/pages/users/UserList";
import CreateUserDialog from "@/pages/users/CreateUserDialog";
import useCounter from "@/hooks/useCounter";

const Home = () => {
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const { counter, startCounter } = useCounter(59);

    const handleResend = () => {
        startCounter(59);
    }

    return (
        <div className="mx-auto max-w-5xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Users</h1>

                <button
                    onClick={() => setOpenCreateDialog(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                    + Add User
                </button>
            </div>

            {counter > 0 ? (
                <p>Resend OTP in ${counter} seconds</p>
            ) :(
                <button onClick={handleResend}>Resend OTP</button>
            )}

            <UserList />

            {openCreateDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                Create User
                            </h2>

                            <button
                                onClick={() => setOpenCreateDialog(false)}
                                className="text-xl text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>
                        </div>

                        <CreateUserDialog
                            onSuccess={() => setOpenCreateDialog(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
