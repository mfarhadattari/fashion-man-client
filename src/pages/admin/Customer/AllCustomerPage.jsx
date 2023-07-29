import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "./../../../components/SectionTitle";
import Loaders from "../../../components/Loaders";
const AllCustomerPage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customer", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-customer");
      return res.data;
    },
  });

  return (
    <main>
      <section className="my-10">
        <SectionTitle title="All Customer" subtitle="See our customer!" />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section className="my-10"></section>
      )}
    </main>
  );
};

export default AllCustomerPage;
