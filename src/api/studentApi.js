const BASE_URL = "http://localhost:3001/students";

// Get All Students (R)
export const getStudents = async () => {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch students");
    }

    return await response.json();
};

// Create Student (C)
export const createStudent = async (student) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    });

    if (!response.ok) {
        throw new Error("Failed to create student");
    }

    return await response.json();
};

// Update Student (U)
export const updateStudent = async (id, student) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    });

    if (!response.ok) {
        throw new Error("Failed to update student");
    }

    return await response.json();
};

// Delete Student (D)
export const deleteStudent = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete student");
    }

    return true;
};
