import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import Loaders from "./../../../components/Loaders";

const AllPaymentPage = () => {
  const { axiosSecure } = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-payment");
      return res.data;
    },
  });

  return (
    <main>
      <section className="my-10">
        <SectionTitle title="All Payments" subtitle="See all payment data!" />
      </section>
      {isLoading ? (
        <div>
          <Loaders />
        </div>
      ) : (
        <section>{payments.length}</section>
      )}
    </main>
  );
};

export default AllPaymentPage;
