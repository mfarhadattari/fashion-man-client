import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const useIsAdmin = () => {
  const { axiosSecure } = useAxiosSecure();
  const { authUser, authLoading } = useAuth();
  const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", axiosSecure, authUser, authLoading],
    queryFn: async () => {
      const token = localStorage.getItem("pf-user-token");
      if (authUser && !authLoading && token) {
        const res = await axiosSecure.get("/isAdmin");
        return res.data.isAdmin;
      }
    },
  });

  return { isAdmin, isAdminLoading };
};

export default useIsAdmin;
