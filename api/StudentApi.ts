import apiClient from './Client';


const register = async (user: any) => {
    console.log("UserNew",user);
    return apiClient.post('/auth/register', {user});
};

const login = async (user: any) => {
    return apiClient.post('/auth/login', user);
};

const getAllStudents = async () => {
    return apiClient.get('/student');
};
const getStudent = async (id: String) => {
    // const response = await apiClient.get(`/student/${id}`);
    // return response.data; 
    return apiClient.get(`/user/${id}`);
};
const getStudentById = async (id: string) => {
    return apiClient.get(`/student/${id}`);
};
const addStudent = async (student: any) => {
    return apiClient.post('/student', student);
};

const updateStudent = async (user: any) => {
    return apiClient.put(`/user/${user._id}`, user);
};

const logout = async (user: any) => {
    return apiClient.post(`/a
    
    uth/logout/${user}`);
}

const uploadImage = async (image: any) => {
    console.log("uploadImageMaor", image);
    return apiClient.post('/fileMulter/file?file=123.jpeg', image, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    
    });

};

export default {
    getAllStudents,
    getStudent,
    addStudent,
    uploadImage,
    register,
    login,
    updateStudent,
    logout,
    getStudentById
};
