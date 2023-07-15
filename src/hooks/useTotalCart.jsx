import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useTotalCart = () => {
  const { axiosSecure } = useAxiosSecure();
  const { authUser, authLoading } = useAuth();

  const { data: itemInCart = 0, refetch: refetchItemInCart } = useQuery({
    queryKey: ["itemInCart", axiosSecure, authUser],
    queryFn: async () => {
      const token = localStorage.getItem("pf-user-token");
      if (authUser && !authLoading && token) {
        const res = await axiosSecure.get("/total-cart");
        return await res.data.totalCart;
      }
    },
  });

  return { itemInCart, refetchItemInCart };
};

export default useTotalCart;
