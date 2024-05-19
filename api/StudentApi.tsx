import apiClient from "./Client";

const getAllStudents = async () => {
 return apiClient.get('/student')
}
export default {
 getAllStudents
}