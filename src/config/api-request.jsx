import axios from "axios";

const ApiRequest = async (url, params) => {
    // Convert params object to a form-encoded string
    const formData = new URLSearchParams(params).toString();

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data;
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