import apiClient from "./Client";

var FormData = require('form-data');

interface IUpoloadResponse {
    url: string;
}

export const uploadPhoto = async (photo: File) => {
    return new Promise<string>((resolve, reject) => {
        console.log("Uploading photo..." + photo)
        const formData = new FormData();
        if (photo) {
            formData.append("file", photo);
            apiClient.post<IUpoloadResponse>('file?file=123.jpeg', formData, {
                headers: {
                    'Content-Type': 'image/jpeg'
                }
            }).then(res => {
                console.log(res);
                if (res.data) {
                    resolve(res.data.url);
                } else {
                    reject(new Error('Response data is undefined.'));
                }
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        }
    });
}