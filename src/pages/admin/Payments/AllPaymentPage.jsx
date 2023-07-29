import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import Loaders from "./../../../components/Loaders";
import { formatTimeDate } from "./../../../utils/utils";

const AllPaymentPage = () => {
  const { axiosSecure } = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-payment");
      return res.data;
    },
  });

  console.log(payments);
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
        <section className="my-10">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="text-center">User Info</th>
                  <th className="text-center">Payment Info</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, idx) => (
                  <tr key={payment._id}>
                    <th>{idx + 1}</th>
                    <td className="text-center space-y-1">
                      <h1>Customer: {payment.name}</h1>
                      <h1>Email: {payment.email}</h1>
                    </td>
                    <td className="text-center space-y-1">
                      <p>Amount: {payment.amount}&#2547;</p>
                      <p>TranID: {payment.tran_id}</p>
                      <div className="flex justify-center gap-3">
                        <p>Date: {formatTimeDate(payment.timeDate).date}</p>
                        <p>Time: {formatTimeDate(payment.timeDate).time}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
};

export default AllPaymentPage;
