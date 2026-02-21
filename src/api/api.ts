// import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-AsyncStorage';
// import AsyncStorage from '@react-native-community/async-storage';
// import { store } from '../store/store';

// const api = axios.create({
//   baseURL: 'https://api.minutos.in',
//   timeout: 120000,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// const apiFormData = axios.create({
//   baseURL: 'https://api.minutos.in',
//   timeout: 120000,
// });

// // const { token } = store.getState().auth;
// // console.log("this is token inside the api.ts file ===>", token)
// const token  = AsyncStorage.getItem('acc_token').then((value) => {
//   console.log("This is token from async storage ===>", value);
//   return value;
// })
// .catch((error) => {
//   console.error("Error retrieving token from AsyncStorage:", error);
//   return null;
// });

// apiFormData.interceptors.request.use(
//   async config => {
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

// api.interceptors.request.use(
//   async config => {
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

// export const fetchData = async (endpoint: string) => {
//   console.log("This is endpoint ===>", endpoint);
//   try {
//     const response = await api.get(endpoint);
//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("Axios Error:", error?.config);
//       return error.response;
//     } else {
//       console.log("Generic Error:", error);
//     }
//   }
// };

// export const postData = async (endpoint: string, body: any) => {
//   console.log("This is createOrder api endpoint ===>", endpoint)
//   try {
//     const response = await api.post(endpoint, body);
//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("Axios Error:", error?.config);
//       return error.response;
//     } else {
//       console.log("Generic Error:", error);
//     }
//   }
// };

// export const putData = async (endpoint: string, body: any) => {
//   try {
//     const response = await api.put(endpoint, body);
//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("Axios PUT Error:", error?.config);
//       return error.response;
//     } else {
//       console.log("Generic PUT Error:", error);
//     }
//   }
// };

// export const postFormData = async (endpoint: string, body: FormData) => {
//   try {
//     const response = await apiFormData.post(endpoint, body, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Accept: 'application/json',
//       },
//     });
//     console.log('Success:___', response.config);
//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("Axios Error:", error?.config);
//       console.log('Error response:', error.response?.data);
//       console.log('Status:', error.response?.status);
//       console.log('Headers:', error.response?.headers);
//       return error.response;
//     } else {
//       console.log("Generic Error:", error);
//     }
//   }
// };

// export const deleteData = async (endpoint: string) => {
//   try {
//     const response = await api.delete(endpoint);
//     console.log('Delete Success:___', response.config);
//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("Delete Axios Error:", error?.config);
//       console.log('Error response:', error.response?.data);
//       console.log('Status:', error.response?.status);
//       console.log('Headers:', error.response?.headers);
//       return error.response;
//     } else {
//       console.log("Delete Generic Error:", error);
//     }
//   }
// };

// export default api;


import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const BASE_URL = 'https://api.minutos.in';

/* ============================
   AXIOS INSTANCES
============================ */

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const apiFormData = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
});

/* ============================
   TOKEN ATTACH INTERCEPTOR
============================ */

const attachToken = async (config: AxiosRequestConfig) => {
  try {
    const token = await AsyncStorage.getItem('acc_token');

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  } catch (error) {
    console.log('Error fetching token:', error);
    return config;
  }
};

api.interceptors.request.use(
  attachToken,
  error => Promise.reject(error),
);

apiFormData.interceptors.request.use(
  attachToken,
  error => Promise.reject(error),
);

/* ============================
   API METHODS
============================ */

export const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const postData = async (endpoint: string, body: any) => {
  try {
    const response = await api.post(endpoint, body);
    return response;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const putData = async (endpoint: string, body: any) => {
  try {
    const response = await api.put(endpoint, body);
    return response;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    const response = await api.delete(endpoint);
    return response;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const postFormData = async (endpoint: string, body: FormData) => {
  try {
    const response = await apiFormData.post(endpoint, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    handleAxiosError(error);
  }
};

/* ============================
   CENTRAL ERROR HANDLER
============================ */

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    console.log('Axios Error Config:', axiosError.config);
    console.log('Status:', axiosError.response?.status);
    console.log('Response Data:', axiosError.response?.data);

    return axiosError.response;
  } else {
    console.log('Unexpected Error:', error);
  }
};

export default api;