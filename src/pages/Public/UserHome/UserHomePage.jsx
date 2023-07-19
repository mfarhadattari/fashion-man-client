import SectionTitle from "../../../components/SectionTitle";
import { useQuery } from "react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Loaders from "../../../components/Loaders";

const UserHomePage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: overview = {}, isLoading } = useQuery({
    queryKey: ["overview", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-overview");
      return res.data;
    },
  });

  console.log(overview);
  return (
    <main>
      <section className="my-10">
        <SectionTitle title="User Home" subtitle="See Overview!" />
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

export default UserHomePage;
