import moment from "moment/moment";
import useAuth from "./../hooks/useAuth";
import { toast } from "react-hot-toast";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import { useState } from "react";
import useTotalCart from "../hooks/useTotalCart";
import Swal from "sweetalert2";

const AddToCart = ({ productInfo }) => {
  const { authUser, authLoading } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const { refetchItemInCart } = useTotalCart();
  const [loading, setLoading] = useState(false);

  const handelAddToCart = () => {
    if (!authUser || authLoading) {
      return toast("Please Login First!");
    }
    const {
      title,
      price,
      size: availableSize,
      _id,
      discount,
      category,
      image,
    } = productInfo;

    const sizes = availableSize.reduce((object, item) => {
      object[item] = item;
      return object;
    }, {});

    Swal.fire({
      title: "Add to Cart",
      input: "select",
      inputOptions: { ...sizes },
      inputPlaceholder: "Select a size",
      showCancelButton: true,
      inputValidator: (value) => {
        setLoading(true);
        const productPrice =
          discount > 0 ? price - (price * discount) / 100 : price;
        const cartInfo = {
          productID: _id,
          title,
          image,
          size: value,
          category,
          price: Math.round(productPrice),
          quantity: 1,
          email: authUser?.email,
          timeDate: moment().format("YYYY-MM-DD/HH:mm:ss"),
        };
        axiosSecure.post("/add-to-cart", cartInfo).then(({ data }) => {
          if (data.insertedId || data.modifiedCount > 0) {
            toast.success("Added Successfully!");
            refetchItemInCart();
          } else {
            toast.error("Something is wrong!");
          }
          setLoading(false);
        });
      },
    });
  };

  return (
    <button
      className="primary-btn w-full"
      onClick={handelAddToCart}
      disabled={loading}
    >
      {loading ? (
        <span className="loading loading-spinner text-slate-900"></span>
      ) : (
        ""
      )}
      Add to cart
    </button>
  );
};

export default AddToCart;
