import PostApi from '../api/PostApi'

export type Post = {
    title: string,
    message: string,
    owner: string
}

const data: Post[] = [
];


const getAllPosts = async () => {
    console.log("getAllPosts()" )
    const res: any = await PostApi.getAllPosts ()
    let data = Array<Post>()
    if (res.data) {
    res.data.forEach((obj: any) => {
    console.log("element: " + obj._id)
    const st: Post = {
    title: obj.title,
    message: obj.message,
    owner: obj.owner
    }
    data.push(st)
    });
    }
    return data
   }

const getPost = (title: string): Post | undefined => {
    return data.find((post) => post.title == title);
}

const addPost = (post: Post) => {
    data.push(post);
}
