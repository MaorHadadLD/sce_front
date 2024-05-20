import apiClient from './Client';


const register = async (user: any) => {
    return apiClient.post('/auth/register', {user});
};

const login = async (user: any) => {
    return apiClient.post('/auth/login', {user});
};

const getAllStudents = async () => {
    return apiClient.get('/student');
};

const addStudent = async (student: any) => {
    return apiClient.post('/student', student);
};

const uploadImage = async (image: any) => {
    return apiClient.post('/fileManager/file', image);
};

export default {
    getAllStudents,
    addStudent,
    uploadImage,
    register,
    login
};
