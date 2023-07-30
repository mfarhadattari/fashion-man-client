import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "./../../../components/SectionTitle";
import Loaders from "../../../components/Loaders";
import { Link } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import ShowBtn from "./../../../components/ShowBtn";
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
      <PageTitle title="Customers | Programmer Fashion" />
      <section className="my-10">
        <SectionTitle title="All Customer" subtitle="See our customer!" />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section className="my-10">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <label>#</label>
                  </th>
                  <th>Image</th>
                  <th>Name & Info</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, idx) => (
                  <tr key={customer._id} className="hover:shadow-xl">
                    <th>
                      <label>{idx + 1}</label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="w-20 h-20 rounded-full">
                            <img
                              className="rounded-full"
                              src={customer?.photoURL}
                              alt={customer?.displayName}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h1>{customer?.displayName}</h1>
                      <h1>{customer?.email}</h1>
                      <h1>{customer?.phone}</h1>
                    </td>
                    <td>
                      <p>{customer?.address}</p>
                      <p>
                        {customer?.city}, {customer?.country}
                      </p>
                    </td>
                    <th>
                      <Link to={`/dashboard/customer/${customer._id}`}>
                        <ShowBtn />
                      </Link>
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

export default AllCustomerPage;
