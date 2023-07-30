import { useParams } from "react-router-dom";
import SectionTitle from "./../../../components/SectionTitle";
import PageTitle from "../../../components/PageTitle";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  return (
    <main className="mb-20">
      <PageTitle title="Customer Details" />
      <section className="my-10">
        <SectionTitle
          title="Customer Details"
          subtitle="See customer info here!"
        />
      </section>
      {id}
    </main>
  );
};

export default CustomerDetailsPage;
