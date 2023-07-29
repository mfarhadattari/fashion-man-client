import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// !Create a instance for axios req
const axiosSecure = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://programmer-fashion.vercel.app",
});

const useAxiosSecure = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
      axiosSecure.interceptors.request.use((req) => {
        const token = localStorage.getItem("pf-user-token");
        if (token) {
          req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
      });
  
      axiosSecure.interceptors.response.use(
        (res) => res,
        async (error) => {
          if (
            (error.response && error.response.status === 401) ||
            error.response.status === 403
          ) {
            await logout();
            navigate("/login");
          }
          return Promise.reject(error);
        }
      );
    }, [logout, navigate]);
  
    return { axiosSecure };
};

export default useAxiosSecure;
