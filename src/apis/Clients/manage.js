import axios from "axios";

export const createClient = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/create/client`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}


export const getAllClients = () => {
    return axios.get(`https://localhost:8000/api/web/route/get/all/client`, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}

export const getAClients = (id) => {
    return axios.get(`https://localhost:8000/api/web/route/get/a/client/${id}`, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}