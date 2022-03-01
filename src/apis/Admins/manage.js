import axios from "axios";

export const createAdmin = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/create/admin`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}


export const getAllAdmins = () => {
    return axios.get(`https://localhost:8000/api/web/route/get/all/admin`, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}