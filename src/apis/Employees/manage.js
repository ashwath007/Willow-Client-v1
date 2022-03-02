import axios from 'axios';


export const createEmployee = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/create/employee`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}



export const getAllEmployee = () => {
    return axios.get(`https://localhost:8000/api/web/route/get/all/employee`, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}