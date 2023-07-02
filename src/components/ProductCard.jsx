import { Link } from "react-router-dom";

const ProductCard = ({ productInfo }) => {
  return (
    <div className="card w-full rounded-none">
      <Link to={`shops/${productInfo?._id}`}>
        <figure>
          <img
            className="w-full"
            src={productInfo?.image}
            alt={productInfo?.title}
          />
        </figure>
      </Link>
      <div className="card-body text-center">
        <h2 className="card-title">{productInfo?.title}</h2>
        <p className="text-blue-700 text-xl font-bold">
          {productInfo?.price} &#2547;
        </p>
        <div className="card-actions">
          <button className="btn bg-green-600 text-white w-full">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
