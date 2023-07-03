import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const prod = data.find((item) => item._id === params.id);
        setProduct(prod);
      });
  }, [params]);

  return (
    <main>
      <section className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5">
          <div>
            <img
              className="h-[500px] w-full"
              src={product?.image}
              alt={product.title}
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl">{product?.title}</h1>
            <div className="flex items-center gap-2">
              <Rating
                style={{ maxWidth: 100 }}
                value={product?.rating}
                readOnly
              />
              <span>({product?.rating})</span>
            </div>
            <p className="text-2xl flex gap-3">
              <span className="line-through">{product?.price} &#2547;</span>
              <span className="text-blue-700">
                {product?.price - (product?.price * product?.discount) / 100}{" "}
                &#2547;
              </span>
            </p>
            <p className="text-lg">
              {product?.featured?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </p>
            <div className="flex gap-5">
              Available Size:
              {product?.size?.map((item, idx) => (
                <span key={idx} className="text-blue-700">
                  {item}
                </span>
              ))}
            </div>
            <button className="green-btn w-[250px]">Add to Cart</button>
            <div className="text-lg">
              <p>Category: {product.category}</p>
              <p className="flex gap-3">
                {product?.tags?.map((tag, idx) => (
                  <span className="link link-hover" key={idx}>
                    #{tag}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-10 p-5">
        <h1 className="text-4xl font-semibold my-5">Description</h1>
        <div className="text-xl mx-auto text-justify border p-5 md:p-10">
          {product?.description}
          </div>
      </section>
    </main>
  );
};

export default ProductDetailsPage;
