import { useParams } from "react-router-dom";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import SectionTitle from "../../../components/SectionTitle";
import Loaders from "../../../components/Loaders";
import { useForm } from "react-hook-form";
import { categories, sizes } from "../../../../public/data/productFormData";
import Select from "react-select";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase/firebase.config";
import { FaCheckCircle } from "react-icons/fa";

const storage = getStorage(app);

const UpdateProductPage = () => {
  const { axiosPublic } = useAxiosPublic();
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", axiosPublic],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      return res.data;
    },
  });


  // ! product size handing
  const [productSizes, setProductSizes] = useState([]);
  const [productSizesError, setProductSizesError] = useState(false);

  const handleSizeChange = (selectedOptions) => {
    const selectedSizes = selectedOptions.map((option) => option.value);
    setProductSizes(selectedSizes);
    setProductSizesError(false);
  };

  // ! product image handling
  const [imageURL, setImageURL] = useState(null);
  const handelFile = (e) => {
    setImageURL(null);
    const imgFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `/products-image/${product.title}.${imgFile.type?.split("/")[1]}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on("state_changed", (snapshot) => {
      if (snapshot.bytesTransferred === snapshot.totalBytes) {
        getDownloadURL(snapshot?.ref).then((url) => {
          setImageURL(url);
          console.log(url);
        });
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelUpdate = (data) => {
    const size = productSizes.length <= 0 ? product.size : productSizes;
    const image = imageURL ? imageURL : product.image;
    const productData = {
      title: data.title,
      image,
      price: data.price,
      discount: data.discount,
      description: data.description,
      category: data.category,
      size,
      featured: data.featured
        .split("\n")
        .filter((feature) => feature.length !== 0),
      tags: data.tags.split("\n").filter((tag) => tag.length !== 0),
    };
    console.log(productData);
  };

  return (
    <main>
      <section className="my-10">
        <SectionTitle
          title="Update Product"
          subtitle="Update product details!"
        />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section className="my-10">
          <form className="mt-5" onSubmit={handleSubmit(handelUpdate)}>
            <div className="flex flex-col md:flex-row md:gap-5">
              {/* ------------- Product Name ---------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="green-input w-full "
                  defaultValue={product.title}
                  {...register("title", { required: true })}
                />
                {errors.title?.type === "required" && (
                  <p className="error-message">Product name is required</p>
                )}
              </div>
              {/* ------------- Product Category Name ---------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  placeholder="Category"
                  className="green-select w-full"
                  defaultValue={product.category}
                  {...register("category", { required: true })}
                >
                  {categories.map((item, idx) => (
                    <option key={idx}>{item}</option>
                  ))}
                </select>
                {errors.category?.type === "required" && (
                  <p className="error-message">Category is required</p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-5">
              {/* ----------------- Size ----------------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Size</span>
                </label>
                <div className="w-full h-[48px] border border-green-600 rounded-none flex flex-col justify-center">
                  <Select
                    name="size"
                    isMulti
                    options={sizes}
                    defaultValue={product.size.map((eachSize) => ({
                      label: eachSize,
                      value: eachSize,
                    }))}
                    className="basic-multi-select"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        borderRadius: "0px",
                        border: "none",
                        height: "100%",
                        width: "100%",
                        outline: "none",
                      }),
                    }}
                    placeholder="Select Size"
                    onChange={handleSizeChange}
                  />
                </div>
                {productSizesError && (
                  <p className="error-message">Size is required</p>
                )}
              </div>
              {/* ----------------- Product Image ----------------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Product Image</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    className="green-file-input"
                    onChange={handelFile}
                  />
                  {imageURL && (
                    <p className="text-green-500 absolute top-3 right-3 text-xl">
                      <FaCheckCircle />
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-5">
              {/* ------------- Product Price ---------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Product Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Product Price"
                  className="green-input w-full "
                  defaultValue={product.price}
                  min={0}
                  {...register("price", { required: true })}
                />
                {errors.price?.type === "required" && (
                  <p className="error-message">Product price is required</p>
                )}
              </div>
              {/* ------------- Product Discount Price ---------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Discount</span>
                </label>
                <input
                  type="number"
                  placeholder="Product Discount"
                  className="green-input w-full "
                  defaultValue={product.discount}
                  min={0}
                  {...register("discount", { required: true })}
                />
                {errors.discount?.type === "required" && (
                  <p className="error-message">Product discount is required</p>
                )}
              </div>
            </div>
            {/* Product Description */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Description</span>
              </label>
              <textarea
                placeholder="Product Description"
                className="green-textarea w-full "
                rows={4}
                defaultValue={product.description}
                {...register("description", { required: true })}
              ></textarea>
              {errors.price?.type === "required" && (
                <p className="error-message">Product description is required</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row md:gap-5">
              {/* Product Featured */}
              <div
                className="form-control w-full"
                title="Write one down another."
              >
                <label className="label">
                  <span className="label-text">Product Featured</span>
                </label>
                <textarea
                  placeholder="Product Featured. Write one down another."
                  className="green-textarea w-full "
                  defaultValue={product?.featured
                    .map((feature) => `${feature} \n`)
                    .join("")}
                  {...register("featured", { required: true })}
                ></textarea>
                {errors.featured?.type === "required" && (
                  <p className="error-message">Product featured is required</p>
                )}
              </div>
              <div
                className="form-control w-full"
                title="Write one down another."
              >
                <label className="label">
                  <span className="label-text">Product Tags</span>
                </label>
                <textarea
                  placeholder="Product Tags. Write one down another."
                  className="green-textarea w-full "
                  defaultValue={product?.tags
                    .map((tag) => `${tag} \n`)
                    .join("")}
                  {...register("tags", { required: true })}
                ></textarea>
                {errors.tags?.type === "required" && (
                  <p className="error-message">Product Tags is required</p>
                )}
              </div>
            </div>

            <div className="form-control w-full mt-3">
              <button className="green-btn">Update Product</button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
};

export default UpdateProductPage;
