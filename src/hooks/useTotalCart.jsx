import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useTotalCart = () => {
  const { axiosSecure } = useAxiosSecure();
  const { authUser, authLoading } = useAuth();

  const { data: itemInCart = 0, refetch: refetchItemInCart } = useQuery({
    queryKey: ["itemInCart", axiosSecure, authUser],
    queryFn: async () => {
      if (!authUser || authLoading) {
        return 0;
      } else {
        const res = await axiosSecure.get("/total-cart");
        return res.data.totalCart;
      }
    },
  });

  return { itemInCart, refetchItemInCart };
};

export default useTotalCart;
