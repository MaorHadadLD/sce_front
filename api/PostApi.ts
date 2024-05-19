import apiClient from "./Client";


const getAllPosts = async () => {
 return apiClient.get('/post')
}

export default {
    getAllPosts
    }
