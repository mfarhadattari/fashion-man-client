import Banner from "./Sections/Banner";
import NewArrivals from "./Sections/NewArrivals";
import PopularProducts from "./Sections/PopularProducts";
import Services from "./Sections/Services";
import PageTitle from "./../../../components/PageTitle";

// TODO: Give us Review

const HomePage = () => {
  return (
    <main>
      <PageTitle title="Programmer Fashion" />
      <Banner />
      <NewArrivals />
      <Services />
      <PopularProducts />
    </main>
  );
};

export default HomePage;
