import PageTitle from "../../../components/PageTitle";
import SectionTitle from "../../../components/SectionTitle";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
      <section>
        {members.length}
      </section>
    </main>
  );
};

export default TeamPage;
