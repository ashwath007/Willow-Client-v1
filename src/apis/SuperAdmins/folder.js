import axios from "axios"

export const createFolderNow = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/create/folder`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}

export const getAllFolderDetails = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/create/all/folder`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}