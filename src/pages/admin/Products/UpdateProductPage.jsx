import { useParams } from "react-router-dom";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";

const UpdateProductPage = () => {
  const { axiosPublic } = useAxiosPublic();
  const { id } = useParams();

  axiosPublic.get(`/products/${id}`).then(({data})=>{
    console.log(data);
  })

  return (
    <main>
    </main>
  );
};

export default UpdateProductPage;
