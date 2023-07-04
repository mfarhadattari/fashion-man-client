import { useEffect, useState } from "react";
import SectionTitle from "../../../../components/SectionTitle";

const OurTeams = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch("/ourTeams.json")
      .then((res) => res.json())
      .then((data) => {
        setTeamMembers(data);
      });
  }, []);
  return (
    <section className="my-20">
      <SectionTitle
        title="Our Teams"
        subtitle="Here our management teams!"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-20 gap-5">
        {teamMembers.map((member) => (
          <div key={member._id} className="w-full rounded-none py-5">
            <img
              className="w-52 mx-auto rounded-full border h-52"
              src={member?.image}
              alt={member?.name}
            />
            <div className="text-center space-y-3 mt-5">
              <h2 className="text-2xl font-semibold">{member?.name}</h2>
              <p className="text-blue-700 text-xl font-bold">
                {member?.position}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeams;
