import axios from "axios";
const BASE_URL = "http://localhost:3001/students";

export const getStudents = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch students");
    }
};

export const createStudent = async (student) => {
    try {
        const response = await axios.post(BASE_URL, student);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create student");
    }
};

export const updateStudent = async (id, student) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, student);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update student");
    }
};

export const deleteStudent = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return true;
    } catch (error) {
        throw new Error("Failed to delete student");
    }
};