import Banner from "./Sections/Banner";
import NewArrivals from "./Sections/NewArrivals";
import PopularProducts from "./Sections/PopularProducts";
import Services from "./Sections/Services";
import PageTitle from "./../../../components/PageTitle";
import Review from "./Sections/Review";
import Category from "./Sections/Category";

// TODO: Give us Review

const HomePage = () => {
  return (
    <main>
      <PageTitle title="Programmer Fashion" />
      <Banner />
      <Category/>
      <NewArrivals />
      <Services />
      <PopularProducts />
      <Review/>
    </main>
  );
};

export default HomePage;
