import apiClient from "./Client";


const getAllPosts = async () => {
 return apiClient.get('/post')
}

const getPost = async (id: string) => {
    return apiClient.get(`/post/${id}`)
}

const addPost = async (post: any) => {
    return apiClient.post('/post', post)
}

const uploadImage = async (image: any) => {
    return apiClient.post('/fileManager/file', image,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        
    })
   }

export default {
    getAllPosts,
    getPost,
    addPost,
    uploadImage,
    
}
