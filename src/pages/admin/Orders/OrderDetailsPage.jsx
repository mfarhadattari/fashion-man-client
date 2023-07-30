import { useParams } from "react-router-dom";
import PageTitle from "./../../../components/PageTitle";
import SectionTitle from "./../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import Loaders from "../../../components/Loaders";
const OrderDetailsPage = () => {
  const { id } = useParams();
  const { axiosSecure } = useAxiosSecure();
  const { data: orderDetails = {}, isLoading } = useQuery({
    queryKey: ["orderDetails", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order/${id}`);
      return res.data;
    },
  });
  console.log(orderDetails);
  return (
    <main className="mb-20">
      <PageTitle title="Order Details | Programmer Fashion" />
      <section className="my-10">
        <SectionTitle title="Order Details" subtitle="See order info here!" />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section></section>
      )}
    </main>
  );
};

export default OrderDetailsPage;
