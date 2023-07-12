import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useParams } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useQuery } from "react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loaders from "./../../../components/Loaders";
import NoData from "../../../components/NoData";
import { useState } from "react";

const ProductDetailsPage = () => {
  const params = useParams();
  const { axiosPublic } = useAxiosPublic();
  const [reviews, setReviews] = useState([]);

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", axiosPublic],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${params.id}`);
      return res.data;
    },
  });

  axiosPublic.get(`/product-reviews/${params.id}`).then(({ data }) => {
    setReviews(data);
  });

  return (
    <main>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : !product ? (
        <NoData />
      ) : (
        <>
          <section className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5">
              <div>
                <img
                  className="h-[500px] w-full"
                  src={product?.image}
                  alt={product?.title}
                />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl">{product?.title}</h1>
                <div className="flex items-center gap-2">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={product?.rating}
                    readOnly
                  />
                  <span>({product?.rating})</span>
                </div>
                <p className="text-2xl flex gap-3">
                  <span className="line-through text-red-500">
                    {product?.price}&#2547;
                  </span>
                  <span className="text-blue-700">
                    {product?.price -
                      (product?.price * product?.discount) / 100}
                    &#2547;
                  </span>
                </p>
                <ul className="text-lg list-disc ps-5">
                  {product?.featured?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <div className="flex gap-5">
                  Available Size:
                  {product?.size?.map((item, idx) => (
                    <span key={idx} className="text-blue-700">
                      {item}
                    </span>
                  ))}
                </div>
                <button className="green-btn w-[250px]">Add to Cart</button>
                <div className="text-lg">
                  <p>Category: {product?.category}</p>
                  <p className="flex gap-3">
                    {product?.tags?.map((tag, idx) => (
                      <span className="link link-hover" key={idx}>
                        #{tag}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="my-10">
            <Tabs>
              <TabList>
                <Tab>
                  <h1 className="text-2xl font-semibold">Description</h1>
                </Tab>
                <Tab>
                  <h1 className="text-2xl font-semibold">Reviews</h1>
                </Tab>
              </TabList>

              <TabPanel>
                <div className="text-xl mx-auto text-justify border p-5 md:p-10">
                  {product?.description}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="p-5 md:p-10 flex flex-col gap-5">
                  {reviews?.map((review, idx) => (
                    <div
                      key={idx}
                      className="md:flex items-center gap-10 even:flex-row-reverse"
                    >
                      <div className="w-fit mx-auto md:w-1/3">
                        <img
                          src={review.image}
                          alt={review.username}
                          className="w-[200px] mx-auto rounded-full border h-[200px]"
                        />
                      </div>
                      <div className="w-fit mx-auto md:w-2/3">
                        <div className="flex justify-between">
                          <span className="text-4xl">
                            <FaQuoteLeft></FaQuoteLeft>
                          </span>
                          <div className="text-xl flex gap-5 items-center">
                            <Rating
                              value={review.rating}
                              readOnly
                              style={{ maxWidth: 150 }}
                            />
                            <span>({review.rating})</span>
                          </div>
                        </div>
                        <p className="text-lg text-justify mt-3">
                          {review.message}
                        </p>
                        <p className="font-bold mt-5 text-xl">{review.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </Tabs>
          </section>
        </>
      )}
    </main>
  );
};

export default ProductDetailsPage;
