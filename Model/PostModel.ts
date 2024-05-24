import PostApi from '../api/PostApi';
import FormData from 'form-data';

export type Post = {
    title: string,
    message: string,
    owner: string,
    imgUrl: string
    _id?: string
};

const data: Post[] = [];

const getAllPosts = async (): Promise<Post[]> => {
    console.log("getAllPosts()");
    const res: any = await PostApi.getAllPosts();
    let data = Array<Post>();
    if (res.data) {
        res.data.forEach((obj: any) => {
            console.log("element: " + obj._id);
            const post: Post = {
                title: obj.title,
                message: obj.message,
                owner: obj.owner,
                imgUrl: obj.imgUrl || '',
                _id: obj._id
            };
            data.push(post);
        });
    }
    return data;
};

const getPost = async (_id: string) => {
    try{
        const res = await PostApi.getPost(_id);
        if (!res) {
            console.log("Get failed", res);
        } else {
            return res;
        }
        
    }catch(err){
        console.log("Get failed", err);
    }
};

const getPostByOwner = async (owner: string): Promise<Post[]>  => {
    try{
        const res = await PostApi.getPostByOwner(owner);
        let data = Array<Post>();
        if (Array.isArray(res.data)) {
            res.data.forEach((obj: any) => {
                console.log("element: " + obj._id);
                const post: Post = {
                    title: obj.title,
                    message: obj.message,
                    owner: obj.owner,
                    imgUrl: obj.imgUrl || '',
                    _id: obj._id
                };
                data.push(post);
            });
        }
        return data;
        
    }catch(err){
        console.log("Get failed", err);
    }
}



const addPost = async (post: Post) => {
    try {
        const res = await PostApi.addPost(post);
        console.log('Post added:', res);
        if (!res) {
            console.log("Save failed", res);
        } else {
            console.log("Save passed");
        }
    } catch (err) {
        console.log("Save failed", err);
    }
};


const deletePost = (title: string) => {
    const index = data.findIndex((post) => post.title === title);
    if (index !== -1) {
        data.splice(index, 1);
    }
};

const uploadImage = async (imageURI: string) => {
    var body = new FormData();
    body.append('file', { name: "name", type: 'image/jpeg', uri: imageURI });
    try {
        const res = await PostApi.uploadImage(body)
        if (!res.ok) {
            console.log("save failed " + res.problem)
        } else {
            if (res.data) {
                const d: any = res.data
                console.log("save passed" + d.url)
                return d.url
            }
        }
    } catch (err) {
        console.log("save failed " + err)
    }
}

export default { getAllPosts, getPost, addPost, deletePost, uploadImage, getPostByOwner };
