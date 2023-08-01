import { useParams } from "react-router-dom";
import SectionTitle from "./../../../components/SectionTitle";
import PageTitle from "../../../components/PageTitle";
import { useQuery } from "react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Loaders from "./../../../components/Loaders";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const { axiosSecure } = useAxiosSecure();
  const { data: customerDetails = {}, isLoading } = useQuery({
    queryKey: ["customerDetails", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/customer/${id}`);
      return res.data;
    },
  });

  console.log(customerDetails);

  return (
    <main className="mb-20">
      <PageTitle title="Customer Details | Programmer Fashion" />
      <section className="my-10">
        <SectionTitle
          title="Customer Details"
          subtitle="See customer info here!"
        />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section className="flex flex-col md:flex-row justify-center gap-10 p-5">
          <div className="flex flex-col md:flex-row items-center gap-5 justify-between border p-5 hover:shadow-2xl rounded-md border-teal-400">
            <div className="avatar">
              <div className="w-40 rounded">
                <img src={customerDetails?.userInfo?.photoURL} />
              </div>
            </div>
            <div className="font-medium">
              <h1>Name: {customerDetails?.userInfo?.displayName}</h1>
              <p>Email: {customerDetails?.userInfo?.email}</p>
              <p>Mobile: {customerDetails?.userInfo?.phone}</p>
              <p>Adress: {customerDetails?.userInfo?.address}</p>
              <p>
                {customerDetails?.userInfo?.city},{" "}
                {customerDetails?.userInfo?.country}
              </p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col gap-2">
            <div className="border  py-1 px-5 rounded-md hover:shadow-2xl border-yellow-600">
              <h3>Total Orders</h3>
              <p className="text-2xl">{customerDetails?.orderInfo?.length}</p>
            </div>
            <div className="border py-1 px-5 rounded-md hover:shadow-2xl border-black">
              <h3>Total Carts</h3>
              <p className="text-2xl">{customerDetails?.cartInfo?.length}</p>
            </div>
            <div className="border py-1 px-5 rounded-md hover:shadow-2xl border-green-600">
              <h3>Total Payment</h3>
              <p className="text-2xl">
                {customerDetails?.paymentInfo?.reduce(
                  (totalPayment, payment) => totalPayment + payment.amount,
                  0
                )}
                &#2547;
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default CustomerDetailsPage;
