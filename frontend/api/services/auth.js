import axios from 'axios';

export const register = async (username, email, password) => {
    const response = await axios.post('http://localhost:8080/future-path/auth/register', {
        nama_user: username,
        email_user: email,
        password_user: password,
    });
    localStorage.setItem('username', username)
    console.log('Username saved:', username);
}

export const login = async (email, password) => {
    const response = await axios.post('http://localhost:8080/future-path/auth/login', {
        email_user: email,
        password_user: password,
    });
    
    const { token, role_id } = response.data.data;
    const username = getUsername();
    localStorage.setItem('username', username)
    localStorage.setItem('email', email)
    console.log('Username saved:', username);
    console.log('Email saved:', email);
    localStorage.setItem('token', token);
    localStorage.setItem('role_id', role_id);
    
    return { token, role_id };
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const validateToken = async (token) => {
    try {
        const response = await axios.post('http://localhost:8080/future-path/auth/validate-token', {
            token: token,
        });
        return response.data; 
    } catch (error) {
        console.error("Token validation failed:", error);
        throw error; 
    }
};

export const getRoleId = () => {
    return localStorage.getItem('role_id');
};

export const getUsername = () => {
    return localStorage.getItem('username');
}

export const getEmail = () => {
    return localStorage.getItem('email');
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role_id');
    localStorage.removeItem('email');
};
