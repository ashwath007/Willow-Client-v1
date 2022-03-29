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

export const getAllClientAssignedAdmins = () => {
    return axios.get(`https://localhost:8000/api/web/route/get/all/clients/assigned`, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}

export const getAllEmployeeAssignedAdmins = () => {
    return axios.get(`https://localhost:8000/api/web/route/get/all/employee/assigned`, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}



export const assignClientToAdminHere = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/assign/client/admin/clientstatus`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}


export const assignEmployeeToAdminHere = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/assign/employee/admin/employeestatus`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}