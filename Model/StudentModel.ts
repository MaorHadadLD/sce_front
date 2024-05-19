export type Student = {
    name: string;
    id: string;
    imgUrl: string;
}

const data: Student[] = [
    {name: 'John Doe', id: '123', imgUrl: 'https://via.placeholder.com/150'},
    {name: 'Jane Doe', id: '456', imgUrl: 'https://via.placeholder.com/150' },
    {name: 'John Smith', id: '789', imgUrl: 'https://via.placeholder.com/150'},
]

const getAllStudents = (): Student[] => {
    return data;
}

const getStudent = (id: string): Student | undefined => {
    return data.find((student) => student.id === id);
}

const addStudent = (student: Student) => {
    data.push(student);
}

const deletStudent = (id: string) => {
    const index = data.findIndex((student) => student.id === id);
    if(index !== -1) {
        data.splice(index, 1);
    }
}

export default {getAllStudents, getStudent, addStudent, deletStudent};