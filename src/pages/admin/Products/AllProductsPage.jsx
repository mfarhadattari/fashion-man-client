import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import Loaders from "../../../components/Loaders";

const AllProductsPage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure("/admin/all-products");
      return res.data;
    },
  });

  console.log(products);
  return (
    <main>
      <section className="mt-10">
        <SectionTitle title="All Products" subtitle="List of all products!" />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section>{products.length}</section>
      )}
    </main>
  );
};

export default AllProductsPage;
