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



// ** Create Sister Company
export const createSysterCompany = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/create/sistercompany`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}

export const getAllCompamyList = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/get/client/all/companies`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}

export const getAllSisterCompamyList = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/get/client/all/companies/all/sistercompanies`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}

export const getAllSisterCompamyDivisionList = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/get/client/all/companies/all/division`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}

export const getAllSisterCompamyAllPlans = (data) => {
    return axios.post(`https://localhost:8000/api/web/route/create/sistercompany/get/all/plans`, data, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}