import axios from "axios";

const ApiRequest = async (url, method, params) => {
    // Convert params object to a form-encoded string
    const formData = new URLSearchParams(params).toString();

    try {
        if (method.toUpperCase() === 'POST') {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            return response.data;
        } else if (method.toUpperCase() === 'GET') {
            const response = await axios.get(`${url}?${formData}`);
            return response.data;
        } else {
            throw new Error('Unsupported HTTP method');
        }
    } catch (error) {
        if (error.response) {
            console.error("Error response: ", error.response.data);
            throw new Error(error.response.data);
        } else if (error.request) {
            console.error("No response received: ", error.request);
            throw new Error("No response received from server");
        } else {
            console.error("Error setting up request: ", error.message);
            throw new Error("Error setting up request");
        }
    }
};

export default ApiRequest;