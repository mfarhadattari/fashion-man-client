import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CartPage = () => {
  const { axiosSecure } = useAxiosSecure();

  const { data: carts = [], isLoading } = useQuery({
    queryKey: ["carts", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-cart");
      return await res.data;
    },
  });

  console.log(carts);

  return (
    <div>
      <h1>This Is Cart Page</h1>
    </div>
  );
};

export default CartPage;
