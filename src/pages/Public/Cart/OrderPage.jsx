import { useQuery } from "react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loaders from "../../../components/Loaders";
import NoData from "../../../components/NoData";

const OrderPage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: orders = [], isLoading: isOrderLoading } = useQuery({
    queryKey: ["orders", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-orders");
      return await res.data;
    },
  });

  return (
    <main>
      <section className="my-10">
        <SectionTitle title="My Orders" subtitle="See Your Orders!" />
      </section>
      {isOrderLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : orders.length < 1 ? (
        <NoData />
      ) : (
        <section>
            {
                orders.length
            }
        </section>
      )}
    </main>
  );
};

export default OrderPage;
