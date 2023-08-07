import axios from 'axios';
export const _post = async (endPoint, data, myHeaders) => {
    return await axios.post(endPoint, data, {
        headers: myHeaders,
    });
}