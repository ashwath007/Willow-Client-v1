import axios from 'axios';

export const getAllDashStats = () => {
    return axios.get(`https://localhost:8000/api/web/route/get/all/stats`, { withCredentials: true })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
}