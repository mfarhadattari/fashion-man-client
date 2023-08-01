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
        <section>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="avatar">
              <div className="w-40 rounded">
                <img src={customerDetails?.userInfo?.photoURL} />
              </div>
            </div>
            <div className="font-medium">
              <h1>Name: {customerDetails?.userInfo?.displayName}</h1>
              <p>Email: {customerDetails?.userInfo?.email}</p>
              <p>Mobile: {customerDetails?.userInfo?.phone}</p>
              <p>Adress: {customerDetails?.userInfo?.address}</p>
              <p>
                {customerDetails?.userInfo?.city},{" "}
                {customerDetails?.userInfo?.country}
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default CustomerDetailsPage;
