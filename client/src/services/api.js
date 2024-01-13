import axios from 'axios';
const API_URL = 'http://localhost:8000';
const headers={
    "Content-Type": "multipart/form-data"
}

export const getSignedUrl = async() => {
    try{
       const response = await axios.get(`${API_URL}/image-url`);
       return response.data;

    }catch (error){
        console.log('Error while calling api',error.message);
        return error.response.data;
    }
}

export const uploadFile = async(url, file) => {
    try{
       const response = await axios.put(url, file, {headers: headers});
       return response.data;

    }catch (error){
        console.log('Error while calling api',error.message);
        if(error.response)
        return error.response.data;
    }
}
