import axios from "axios";
const instance = axios.create({
    baseURL: '/api/v1',
    withCredentials: true,
})

// Create a CancelToken source
export const cancelTokenSource = axios.CancelToken.source();

// Add a request interceptor to the Axios instance
instance.interceptors.request.use(config => {
  // Attach the cancel token to the request configuration
  config.cancelToken = cancelTokenSource.token;
  return config;
});

export default instance