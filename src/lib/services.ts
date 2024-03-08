import axios from "./axiosConfig";

export const fetchPlaces = async () => {
    const apiKey = '5bdb68c9efa67cf69f3425f908'; // Replace this with your actual API key
    try {
        const response = await axios.get('/places', {
            headers: {
                'x-api-key': apiKey
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch places');
    }
};