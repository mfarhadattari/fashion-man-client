import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaEye } from "react-icons/fa";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loaders from "../../../components/Loaders";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import FirebaseErrorAlert from "../../../components/FirebaseErrorAlert";
import app from "../../../firebase/firebase.config";
import SuccessAlert from "../../../components/SuccessAlert";
import PageTitle from "../../../components/PageTitle";

const storage = getStorage(app);

const ProfilePage = () => {
  const { authUser, updateInfo } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const imgExt = image?.type?.split("/")[1];

  const {
    data: userInfo = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userInfo", authUser],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-user?email=${authUser.email}`);
      return await res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelFile = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile?.size > 300000) {
      setImage(null);
      toast("Image must size less then 300kb");
      return;
    }
    const storageRef = ref(
      storage,
      `/users-avatar/${authUser.email}-avatar.${imgExt}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          getDownloadURL(snapshot?.ref).then((url) => {
            setImage(url);
          });
        }
      },
      (error) => toast.error(error.message)
    );
  };

  const onUpdate = (data) => {
    const { firstName, lastName, city, country, phone, address } = data;
    updateInfo(`${firstName} ${lastName}`, image ? image : authUser.photoURL)
      .then(() => {
        axiosSecure
          .patch("/update-info", {
            displayName: `${firstName} ${lastName}`,
            phone,
            city,
            country,
            address,
            photoURL: authUser.photoURL,
          })
          .then(({ data }) => {
            if (data.modifiedCount > 0) {
              SuccessAlert("Successfully Updated!").then(() => {
                refetch();
              });
            }
          });
      })
      .catch((error) => {
        FirebaseErrorAlert(error.message);
      });
  };

  return (
    <main className="p-5">
      <PageTitle title="Profile | Programmer Fashion" />
      <h1 className="text-3xl  mt-5">
        Welcome {authUser.displayName}! How are you today?
      </h1>
      {isLoading ? (
        <div className="h-[300px] flex item-center">
          <Loaders></Loaders>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
          <div className="flex flex-col justify-center items-center gap-5">
            <img src={userInfo?.photoURL} className="w-[200px] rounded-full" />
            <input
              type="file"
              className={`green-file-input ${!isEdit && "hidden"}`}
              onChange={handelFile}
            />
            <div>
              <button
                type="button"
                className="btn"
                onClick={() => setIsEdit(!isEdit)}
              >
                {isEdit ? (
                  <span className="flex gap-2 items-center justify-center">
                    <FaEye></FaEye>
                    View Profile
                  </span>
                ) : (
                  <span className="flex gap-2 items-center justify-center">
                    <FaEdit></FaEdit>
                    Edit Profile
                  </span>
                )}
              </button>
            </div>
            <div
              className={`w-full flex flex-col items-center ${
                isEdit && "hidden"
              }`}
            >
              <Link className="link link-hover">Change Password</Link>
              <Link className="link link-hover">Change Email</Link>
            </div>
          </div>
          <div className="col-span-2">
            <form onSubmit={handleSubmit(onUpdate)}>
              <div className="flex flex-col md:flex-row md:gap-5">
                {/* ------------- First Name ---------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.displayName?.split(" ")[0]}
                    placeholder={
                      !userInfo?.displayName?.split(" ")[0] ? "Not set" : ""
                    }
                    disabled={!isEdit}
                    className="green-input w-full "
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName?.type === "required" && (
                    <p className="error-message">First name is required</p>
                  )}
                </div>
                {/* ------------- Last Name ---------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.displayName
                      ?.split(" ")
                      .slice(1)
                      .join(" ")}
                    placeholder={
                      !userInfo?.displayName?.split(" ").slice(1).join(" ")
                        ? "Not set"
                        : ""
                    }
                    disabled={!isEdit}
                    className="green-input w-full "
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName?.type === "required" && (
                    <p className="error-message">Last name is required</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-5">
                {/* ----------------- Email ----------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.email}
                    disabled={true}
                    className="green-input w-full "
                  />
                </div>
                {/* ----------------- Phone ----------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="tel"
                    defaultValue={userInfo?.phone}
                    placeholder={!userInfo?.phone ? "Not set" : ""}
                    disabled={!isEdit}
                    className="green-input w-full "
                    {...register("phone")}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-5">
                {/* ----------------- City ----------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.city}
                    placeholder={!userInfo?.city ? "Not set" : ""}
                    disabled={!isEdit}
                    className="green-input w-full "
                    {...register("city")}
                  />
                </div>
                {/* ----------------- Country ----------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Country</span>
                  </label>
                  <input
                    type="tel"
                    defaultValue={userInfo?.country}
                    placeholder={!userInfo?.country ? "Not set" : ""}
                    disabled={!isEdit}
                    className="green-input w-full "
                    {...register("country")}
                  />
                </div>
              </div>
              {/* ----------------- Address ----------------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Details Address</span>
                </label>
                <textarea
                  defaultValue={userInfo?.address}
                  placeholder={!userInfo?.address ? "Not set" : ""}
                  disabled={!isEdit}
                  className="green-textarea"
                  {...register("address")}
                ></textarea>
              </div>
              <div className={`form-control w-full ${!isEdit && "hidden"}`}>
                <button type="submit" className="green-btn mt-5">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
