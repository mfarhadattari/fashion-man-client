import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loaders from "../../../components/Loaders";
import NoData from "../../../components/NoData";
import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import PageTitle from "../../../components/PageTitle";

const CheckoutPage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { authUser } = useAuth();

  const { data: userInfo = {} } = useQuery({
    queryKey: ["userInfo", authUser],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-user?email=${authUser.email}`);
      return await res.data;
    },
  });

  const { data: carts = [], isLoading: isCartLoading } = useQuery({
    queryKey: ["carts", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-cart");
      return await res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onOrder = (data) => {
    const totalAmount = carts.reduce(
      (totalAmount, cart) => cart.price * cart.quantity + totalAmount,
      0
    );

    const products = carts.map((cart) => ({
      cartId: cart._id,
      productId: cart.productID,
      productName: cart.title,
      image: cart.image,
      price: cart.price,
      quantity: cart.quantity,
      size: cart.size,
    }));

    data.email = authUser?.email;
    data.totalAmount = totalAmount;
    data.products = products;
    data.timeDate = moment().format("YYYY-MM-DD/HH:mm:ss");
    axiosSecure.post("/initialize-payment", data).then(({ data }) => {
      window.location.replace(data.url);
    });
  };

  return (
    <main>
      <PageTitle title="Checkout | Programmer Fashion" />
      <section className="my-10">
        <SectionTitle title="Checkout" subtitle="Place you order!" />
      </section>
      {isCartLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : carts.length < 1 ? (
        <NoData />
      ) : (
        <section className="my-10 lg:w-3/4 mx-auto">
          <div className="p-5">
            <h1 className="text-2xl text-center uppercase">Checkout Form</h1>
            <form onSubmit={handleSubmit(onOrder)}>
              <div className="flex flex-col md:flex-row md:gap-5">
                {/* -------------  Name ---------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.displayName}
                    className="primary-input w-full "
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <p className="error-message">First name is required</p>
                  )}
                </div>
                {/* ----------------- Email ----------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    defaultValue={userInfo?.email}
                    disabled={true}
                    className="primary-input w-full "
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-5">
                {/* ----------------- Phone ----------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="tel"
                    defaultValue={userInfo?.phone}
                    placeholder="Phone Number"
                    className="primary-input w-full "
                    {...register("phone", { required: true })}
                  />
                  {errors.phone?.type === "required" && (
                    <p className="error-message">Phone is required</p>
                  )}
                </div>
                {/* ----------------- Total Amount ----------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Total Amount</span>
                  </label>
                  <input
                    defaultValue={carts.reduce(
                      (totalAmount, cart) =>
                        cart.price * cart.quantity + totalAmount,
                      0
                    )}
                    className="primary-input w-full "
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-5">
                {/* ----------------- City ----------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.city}
                    placeholder={!userInfo?.city ? "Not set" : ""}
                    className="primary-input w-full "
                    {...register("city", { required: true })}
                  />
                  {errors.city?.type === "required" && (
                    <p className="error-message">City is required</p>
                  )}
                </div>

                {/* ----------------- Post Code ----------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Post Code</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Post Code"
                    className="primary-input w-full "
                    {...register("postCode", { required: true })}
                  />
                  {errors.postCode?.type === "required" && (
                    <p className="error-message">Post Code is required</p>
                  )}
                </div>
              </div>
              {/* ----------------- Address ----------------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Details Address</span>
                </label>
                <textarea
                  defaultValue={userInfo?.address}
                  placeholder={!userInfo?.address ? "Not set" : ""}
                  className="primary-textarea"
                  {...register("address", { required: true })}
                ></textarea>
                {errors.address?.type === "required" && (
                  <p className="error-message">Address is required</p>
                )}
              </div>
              <div className="form-control w-full">
                <button
                  to="/dashboard/checkout"
                  className="primary-btn w-[200px] mt-5"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
          {/* ---------------------------- Order Item ----------------------- */}
          <div className="mt-10">
            <h1 className="text-2xl text-center uppercase">Order Item</h1>
            <div className="overflow-x-auto">
              <table className="table">
                <tbody>
                  {carts.map((cart) => (
                    <tr key={cart._id}>
                      <td>
                        <div className="avatar">
                          <div className="w-20 h-20">
                            <img src={cart.image} alt={cart.title} />
                          </div>
                        </div>
                      </td>
                      <td className="w-1/3">
                        <h1>{cart.title}</h1>
                      </td>
                      <td className="text-center space-y-1">
                        <p>Price: {cart.price}&#2547;</p>
                        <p>Size: {cart.size}</p>
                        <p>Quantity: {cart.quantity}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default CheckoutPage;
