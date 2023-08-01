import { Link, useParams } from "react-router-dom";
import SectionTitle from "./../../../components/SectionTitle";
import PageTitle from "../../../components/PageTitle";
import { useQuery } from "react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Loaders from "./../../../components/Loaders";
import { formatTimeDate } from "../../../utils/utils";
import ShowBtn from "../../../components/ShowBtn";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const { axiosSecure } = useAxiosSecure();
  const {
    data: customerDetails = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["customerDetails", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/customer/${id}`);
      return res.data;
    },
  });

  const handelApproveOrder = (id) => {
    axiosSecure.patch(`/admin/approve-order/${id}`).then(({ data }) => {
      if (data.modifiedCount) {
        toast.success("Approve Successfully!");
        refetch();
      } else {
        toast.error("Somethings went wrong!");
      }
    });
  };

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
        <>
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
          <section>
            <div>
              <h1 className="text-center text-xl font-bold uppercase border-b-4 border-gray-600 w-fit mx-auto">
                Customer Order
              </h1>

              <div className="overflow-x-auto mt-5 border">
                <table className="table">
                  <tbody>
                    {customerDetails?.orderInfo?.map((order, idx) => (
                      <tr key={order._id}>
                        <th>{idx + 1}</th>
                        <td className="text-center space-y-1">
                          <div className="flex gap-3 justify-center">
                            <p>Amount: {order.totalAmount}&#2547;</p>
                            <p>
                              Items:{" "}
                              {order.products.reduce(
                                (items, prod) => prod.quantity + items,
                                0
                              )}
                              pes
                            </p>
                          </div>
                          <p>TranID: {order.tran_id}</p>
                          <div className="flex justify-center gap-3">
                            <p>Date: {formatTimeDate(order.timeDate).date}</p>
                            <p>Time: {formatTimeDate(order.timeDate).time}</p>
                          </div>
                        </td>
                        <td className="text-center space-y-1"></td>
                        <td className="text-center space-y-1">
                          <p className="text-base font-bold">{order.status}</p>
                        </td>
                        <th>
                          <div className="flex flex-col gap-2 justify-center items-center">
                            <Link to={`/dashboard/order/${order._id}`}>
                              <ShowBtn />
                            </Link>
                            {order.status === "Paid" && (
                              <button
                                onClick={() => handelApproveOrder(order._id)}
                                className="btn btn-sm text-xl btn-outline text-green-500 btn-circle"
                              >
                                <FaCheckCircle />
                              </button>
                            )}
                          </div>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default CustomerDetailsPage;
