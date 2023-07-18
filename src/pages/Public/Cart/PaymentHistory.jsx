import Loaders from "../../../components/Loaders";
import NoData from "../../../components/NoData";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";

const PaymentHistory = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-payments");
      return res.data;
    },
  });
  console.log(payments);
  return (
    <main>
      <section className="my-10">
        <SectionTitle title="Payment History" subtitle="See Your Payment History!" />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : payments.length < 1 ? (
        <NoData />
      ) : (
        <section className="my-10 lg:w-3/4 mx-auto">
          {
            payments.length
          }
        </section>
      )}
    </main>
  );
};

export default PaymentHistory;
