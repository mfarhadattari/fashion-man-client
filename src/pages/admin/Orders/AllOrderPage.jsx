import { useQuery } from "react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loaders from "../../../components/Loaders";

const AllOrderPage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-order");
      return res.data;
    },
  });

  return (
    <main>
      <section className="my-10">
        <SectionTitle
          title="All Orders"
          subtitle="Here are order from customer!"
        />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section className="my-10">{orders.length}</section>
      )}
    </main>
  );
};

export default AllOrderPage;
