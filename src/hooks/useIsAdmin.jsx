import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";
const useIsAdmin = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/isAdmin");
      return res.data.isAdmin;
    },
  });

  return { isAdmin, isAdminLoading };
};

export default useIsAdmin;
