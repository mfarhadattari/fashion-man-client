import PageTitle from "../../../components/PageTitle";
import SectionTitle from "../../../components/SectionTitle";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loaders from "../../../components/Loaders";

const TeamPage = () => {
  const { axiosSecure } = useAxiosSecure();

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["members", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/team-members");
      return res.data;
    },
  });

  return (
    <main>
      <PageTitle title="Our Team Members | Programmer Fashion" />
      <section className="my-10">
        <SectionTitle title="Our Team Members" />
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
                  <th>Name & Post</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, idx) => (
                  <tr key={member._id} className="hover:shadow-xl">
                    <th>
                      <label>{idx + 1}</label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="w-20 h-20 rounded-full">
                            <img
                              className="rounded-full"
                              src={member?.image}
                              alt={member?.name}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h1>{member?.name}</h1>
                      <h1>{member?.position}</h1>
                    </td>
                    <td>
                      <p>{member?.email}</p>
                      <p>{member?.phone}</p>
                      <p>{member?.address}</p>
                    </td>
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

export default TeamPage;
