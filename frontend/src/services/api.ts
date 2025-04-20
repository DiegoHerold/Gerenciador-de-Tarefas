import axios from "axios";

// Instância principal do Axios
// export const api = axios.create({
//   baseURL: "http://localhost:3002/api", // Gateway
// });
// api.ts
export const api = axios.create({
  baseURL: "http://localhost:3002/api", // direto no auth-service
});


// Interceptor de requisição: adiciona o JWT automaticamente
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta: opcional para tratar erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expirado ou inválido.");
      // Aqui você pode redirecionar para o login ou apagar o token
    }
    return Promise.reject(error);
  }
);
