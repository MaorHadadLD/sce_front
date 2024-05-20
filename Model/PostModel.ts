import PostApi from '../api/PostApi'
import FormData from 'form-data'

export type Post = {
    title: string,
    message: string,
    owner: string
    imageUrl: string
}

const data: Post[] = [
];


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
                imageUrl: obj.imageUrl || ''
            };
            data.push(post);
        });
    }
    return data;
};

const getPost = (title: string): Post | undefined => {
    return data.find((post) => post.title == title);
}

const addPost = (post: Post) => {
    const data = {
        title: post.title,
        message: post.message,
        owner: post.owner,
        imageUrl: post.imageUrl
    }
    try {
        const res = PostApi.addPost(data)
        console.log('post added:', res);
        if (!res) {
            console.log("save failed " + res)
        } else {
            console.log("save passed")
        }
    } catch (err) {
        console.log("save failed " + err)
    }
}

const deletePost = (title: string) => {
    const index = data.findIndex((post) => post.title === title);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

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

export default { getAllPosts, getPost, addPost, deletePost, uploadImage };
