import { Link } from "react-router-dom";

const ProductCard = ({ productInfo }) => {
  return (
    <div className="card w-full rounded-none">
      <Link to={`/shop/${productInfo?._id}`}>
        <figure>
          <img
            className="w-full"
            src={productInfo?.image}
            alt={productInfo?.title}
          />
        </figure>
        <div className="card-body text-center pb-2">
          <h2 className="card-title">{productInfo?.title}</h2>
          <p className="text-blue-700 text-xl font-bold">
            {productInfo?.price} &#2547;
          </p>
        </div>
      </Link>
      <button className="green-btn w-full">
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
