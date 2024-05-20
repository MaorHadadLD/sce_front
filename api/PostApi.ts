import apiClient from "./Client";


const getAllPosts = async () => {
 return apiClient.get('/post')
}

const addPost = async (post: any) => {
    return apiClient.post('/post', post)
}

const uploadImage = async (image: any) => {
    return apiClient.get('/fileManager/file', image)
   }

export default {
    getAllPosts,
    addPost,
    uploadImage,
    
}
