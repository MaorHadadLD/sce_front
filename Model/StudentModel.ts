import StudentApi from "../api/StudentApi";

export type Student = {
    name: string,
    id: string,
    imgUrl: string
}

const data: Student[] = [
];

const getAllStudents = async () => {
    console.log("getAllStudents()" )
    const res: any = await StudentApi.getAllStudents ()
    let data = Array<Student>()
    if (res.data) {
    res.data.forEach((obj: any) => {
    console.log("element: " + obj._id)
    const st: Student = {
    name: obj.message,
    id: obj._id,
    imgUrl: "../assets/avatar_user.png"
    }
    data.push(st)
    });
    }
    return data
   }

const getStudent = (id: string): Student | undefined => {
    return data.find((student) => student.id == id);
}

const addStudent = (student: Student) => {
    data.push(student);
}

const deleteStudent = (id: string) => {
    const index = data.findIndex((student) => student.id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

export default { getAllStudents, getStudent, addStudent, deleteStudent };