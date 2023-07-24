import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import Loaders from "../../../components/Loaders";
import DeleteBtn from "../../../components/DeleteBtn";
import ShowBtn from "../../../components/ShowBtn";
import EditBtn from "../../../components/EditBtn";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const AllProductsPage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["products", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure("/admin/all-products");
      return res.data;
    },
  });

  const deleteProduct = (id) => {
    axiosSecure.delete(`/admin/delete-product/${id}`).then(({ data }) => {
      if (data.deletedCount > 0) {
        toast.success("Deleted Successfully!");
        refetch()
      }
    });
  };
  return (
    <main className="mb-20">
      <section className="mt-10">
        <SectionTitle title="All Products" subtitle="List of all products!" />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section className="mt-10">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <label>#</label>
                  </th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Info</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr key={product._id} className="hover:shadow-xl">
                    <th>
                      <label>{idx + 1}</label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="w-20 h-20">
                            <img src={product.image} alt={product.title} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h1>{product.title}</h1>
                    </td>
                    <td>
                      <p>Price: {product.price}&#2547;</p>
                      <p>Discount: {product.discount}%</p>
                      <p>Rating: {product.rating}</p>
                    </td>
                    <th>
                      <div className="flex flex-col gap-1">
                        <DeleteBtn onClick={() => deleteProduct(product._id)} />
                        <Link to={`/shop/${product._id}`}>
                          <ShowBtn />
                        </Link>
                        <Link to={`/dashboard/update-product/${product._id}`}>
                          <EditBtn />
                        </Link>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
};

export default AllProductsPage;
