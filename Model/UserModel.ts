import StudentApi from "../api/StudentApi";
import FormData from "form-data";

export type User = {
    name: string;
     id?: string;
    imgUrl: string;
    email: string; 
    password: string;
};

const data: User[] = [
];

const getAllStudents = async () => {
    console.log("getAllStudents()")
    const res: any = await StudentApi.getAllStudents()
    let data = Array<User>()
    if (res.data) {
        res.data.forEach((obj: any) => {
            console.log("element: " + obj._id)
            const st: User = {
                name: obj.message,
                id: obj._id,
                imgUrl: obj.imgUrl || "../assets/avatar_user.png",
                email: "",
                password: "",
            }
            data.push(st)
        });
    }
    return data
}

const getStudent  = async (id: string) => {
    console.log("getStudent()")
    try{const res = await StudentApi.getStudent(id)
        console.log("resBBBB: " + res.data)
        if(!res){
            console.log("Get failed", res)
        }
        else{
            return res
        }}
    catch(err){
        console.log("Get failed", err)
    }
    
    
   
}

const addStudent = (user: User) => {
    const data = {
        name: user.name,
        id: user.id,
        imgUrl: user.imgUrl,
        email: user.email,
    };  
    console.log('user added:', data);
};

const deleteStudent = (id: string) => {
    const index = data.findIndex((user) => user.id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

const uploadImage = async (imageURI: string) => {
    let body = new FormData();
    body.append('file', {
        uri: imageURI,
        name: 'photo.jpg',
        type: 'image/jpeg'
    });

    try {
        const res = await StudentApi.uploadImage(body);
        if (res.status !== 200) {
            console.log("save failed.. " + res.problem);
        } else {
            const d = res.data;
            console.log("save passed" + d);
            return d.url;
        }
    } catch (err) {
        console.log("save failed " + err);
    }
};

export default { getAllStudents, getStudent, addStudent, deleteStudent, uploadImage };