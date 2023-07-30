import SectionTitle from "./../../../components/SectionTitle";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import Loaders from "./../../../components/Loaders";
import { FaBoxOpen, FaCoins, FaShippingFast, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const AdminHomePage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: adminOverview, isLoading } = useQuery({
    queryKey: ["adminOverview", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("admin/overview");
      return res.data;
    },
  });

  console.log(adminOverview);

  return (
    <main>
      <section className="my-10">
        <SectionTitle
          title="Admin Home Page"
          subtitle="Discover & Manage Website!"
        />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center">
            <Link
              to="/dashboard/all-products"
              className="flex justify-center gap-10 items-end border rounded-md shadow-lg p-5 hover:border-green-600 "
            >
              <div className="font-bold">
                <h1 className="text-xl">Total Product</h1>
                <p className="text-4xl text-neutral">
                  {adminOverview?.totalProduct}
                </p>
              </div>
              <div className="text-7xl text-neutral">
                <FaBoxOpen />
              </div>
            </Link>
            <Link
              to="/dashboard/all-customers"
              className="flex justify-center gap-10 items-end border rounded-md shadow-lg p-5 hover:border-green-600 "
            >
              <div className="font-bold">
                <h1 className="text-xl">Total Customer</h1>
                <p className="text-4xl text-success">
                  {adminOverview?.totalCustomer}
                </p>
              </div>
              <div className="text-7xl text-success">
                <FaUser />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 justify-center mt-10">
            <div className="flex justify-center gap-10 items-end border rounded-md shadow-lg p-5 hover:border-green-600 ">
              <div className="font-bold">
                <h1 className="text-xl">Total Carts</h1>
                <p className="text-4xl text-primary">
                  {adminOverview.totalCart}
                </p>
              </div>
              <div className="text-7xl text-primary">
                <FaShoppingCart />
              </div>
            </div>
            <Link
              className="flex justify-center gap-10 items-end border rounded-md shadow-lg p-5 hover:border-green-600 "
              to="/dashboard/all-orders"
            >
              <div className="font-bold">
                <h1 className="text-xl">Total Orders</h1>
                <p className="text-4xl text-secondary">
                  {adminOverview?.OrderInfo?.reduce(
                    (totalOrder, item) => totalOrder + item.count,
                    0
                  )}
                </p>
              </div>
              <div className="text-7xl text-secondary">
                <FaShippingFast />
              </div>
            </Link>
            <Link
              to="/dashboard/all-payments"
              className="flex justify-center gap-10 items-end border rounded-md shadow-lg p-5 hover:border-green-600 "
            >
              <div className="font-bold">
                <h1 className="text-xl">Total Payment</h1>
                <p className="text-4xl text-accent">
                  {adminOverview?.paymentInfo?.reduce(
                    (totalPayment, item) => totalPayment + item.totalAmount,
                    0
                  )}
                </p>
              </div>
              <div className="text-7xl text-accent">
                <FaCoins />
              </div>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default AdminHomePage;
