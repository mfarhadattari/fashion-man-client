import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const params = useParams();
  return (
    <main>
      <h1>Product Details of {params.id}</h1>
    </main>
  );
};

export default ProductDetailsPage;
