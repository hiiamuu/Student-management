import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (id) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );
    if (!response.ok) throw new Error("User not found.");
    return response.json();
};

const UserDetail = () => {
    const [userId, setUserId] = useState(1);

    // userId= 1

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchUser(userId),
    });

    return (
        <div className="max-w-md p-6">
            <div className="mb-6 flex gap-2">
                {[1, 2, 3, 4, 5].map((id) => (
                    <button
                        key={id}
                        onClick={() => setUserId(id)}
                        className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition ${
                            userId === id
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        User {id}
                    </button>
                ))}
            </div>

            {isLoading && (
                <p className="text-sm text-gray-400">
                    Loading user {userId}...
                </p>
            )}

            {isError && (
                <p className="text-sm text-red-500">Could not load user.</p>
            )}

            {user && !isLoading && (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        {user.name}
                    </h2>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p>📧 {user.email}</p>
                        <p>📞 {user.phone}</p>
                        <p>🌐 {user.website}</p>
                        <p>📍 {user.address.city}</p>
                        <p>🏢 {user.company.name}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetail;
