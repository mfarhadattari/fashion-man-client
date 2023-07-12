import Banner from "./Sections/Banner";
import NewArrivals from "./Sections/NewArrivals";
import PopularProducts from "./Sections/PopularProducts";
import Services from "./Sections/Services";

// TODO: Give us Review

const HomePage = () => {
  return (
    <main>
      <Banner></Banner>
      <NewArrivals></NewArrivals>
      <Services></Services>
      <PopularProducts></PopularProducts>
    </main>
  );
};

export default HomePage;
