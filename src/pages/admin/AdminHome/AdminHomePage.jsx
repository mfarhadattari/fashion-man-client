import SectionTitle from "./../../../components/SectionTitle";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import Loaders from "./../../../components/Loaders";
const AdminHomePage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: adminOverview, isLoading } = useQuery({
    queryKey: ["adminOverview", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get('admin/overview');
      return res.data;
    },
  });

  console.log(adminOverview);

  return (
    <main>
      <section className="my-10">
        <SectionTitle
          title="Admin Home Page"
          subtitle="Discover & Manage Website!"
        />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section></section>
      )}
    </main>
  );
};

export default AdminHomePage;
