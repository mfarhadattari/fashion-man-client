import { useParams } from "react-router-dom";
import PageTitle from "./../../../components/PageTitle";
import SectionTitle from "./../../../components/SectionTitle";
const OrderDetailsPage = () => {
  const { id } = useParams();
  return (
    <main className="mb-20">
      <PageTitle title="Order Details | Programmer Fashion" />
      <section className="my-10">
        <SectionTitle title="Order Details" subtitle="See order info here!" />
      </section>
      {id}
    </main>
  );
};

export default OrderDetailsPage;
