import { useEffect, useState } from "react";
import SectionTitle from "../../../../components/SectionTitle";
import ProductCard from "../../../../components/ProductCard";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <section className="mt-20">
      <SectionTitle
        title="Discover New Arrivals"
        subtitle="Recently added products!"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-5 p-5">
        {products.map((product) => (
          <ProductCard key={product._id} productInfo={product}></ProductCard>
        ))}
      </div>
      <div className="flex justify-center my-5">
        <Link to='/shop' className="btn rounded-none w-[250px]">Shop Now</Link>
      </div>
    </section>
  );
};

export default NewArrivals;
