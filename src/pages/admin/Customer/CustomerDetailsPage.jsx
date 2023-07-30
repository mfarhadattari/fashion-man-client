import { useParams } from "react-router-dom";
import SectionTitle from "./../../../components/SectionTitle";
import PageTitle from "../../../components/PageTitle";
import { useQuery } from "react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Loaders from "./../../../components/Loaders";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const { axiosSecure } = useAxiosSecure();
  const { data: customerDetails = {}, isLoading } = useQuery({
    queryKey: ["customerDetails", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/customer/${id}`);
      return res.data;
    },
  });

  console.log(customerDetails);

  return (
    <main className="mb-20">
      <PageTitle title="Customer Details | Programmer Fashion" />
      <section className="my-10">
        <SectionTitle
          title="Customer Details"
          subtitle="See customer info here!"
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

export default CustomerDetailsPage;
