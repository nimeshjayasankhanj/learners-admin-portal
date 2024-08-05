import axios from 'axios';

export const loginService = (data: any) => {

    return axios
        .post('http://192.168.8.113:8000/auth/login', data)
        .then(function (response) {
            localStorage.setItem('access_token', response.data.data.access_token)
            localStorage.setItem('refresh_token', response.data.data.refresh_token)
            return response;
        })
        .catch(function (error) {
            return error?.response;
        });
};
