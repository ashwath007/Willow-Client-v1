import axios from "axios";


// ** ------------------- All Authentication APIs Here ----------------------

export const isAutheticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
    } else {
        return false;
    }
}


// ? If User Came to Login "/login" Page after LoggingIn
export const isAlreadyAutheticated = () => {
    return axios.get(`https://localhost:8000/api/web/route/check/superadmin`, { withCredentials: true }).then(res => {
        if (res) {
            return res;
        }
    }).catch(err => {
        console.log(err)
    });
}


// export const isAutheticated = () => {
//     if (typeof window == "undefined") {
//       return false;
//     }
//     if (localStorage.getItem("jwt")) {
//       return JSON.parse(localStorage.getItem("jwt"));
//     } else {
//       return false;
//     }
//   };

export const adminLoginSubmit = (data) => {
    const { email, password } = data;
    return axios.post(`https://localhost:8000/api/web/route/login/superadmin`, { email, password }, { withCredentials: true })
        .then(res => {
            return res;
        }).catch(err => {
            console.log(err)
        });
}
export const adminLogoutSubmit = () => {
    return axios.post(`https://localhost:8000/api/web/route/logout/superadmin`, { withCredentials: true })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err)
        })
}

export const clearUserToken = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        next();
    }
}


export const setAdminDetails = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data));
        next();
    }
}

// ** -----------------------------------------------------------















export const dummyCheck = () => {
    return axios.get(`https://localhost:8000/`, { withCredentials: true }).then(res => {
        return res;
    }).catch(err => {
        console.log(err)
    });
}

export const dummyCheckRouter = () => {
    return axios.get(`https://localhost:8000/api/web/route/check/superadmin`, { withCredentials: true }).then(res => {
        return res;
    }).catch(err => {
        console.log(err)
    });
}