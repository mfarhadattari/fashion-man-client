import MenuCover from "../../../components/MenuCover";
import banner from "../../../assets/images/banner.jpg";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";

// TODO: Filtering, Searching, Pagination

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <main>
      <MenuCover
        heading="Our Shop"
        subheading="Get your favorite product"
        backgroundURL={banner}
      ></MenuCover>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-5 p-5">
          {products.map((product) => (
            <ProductCard key={product._id} productInfo={product}></ProductCard>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Shop;
