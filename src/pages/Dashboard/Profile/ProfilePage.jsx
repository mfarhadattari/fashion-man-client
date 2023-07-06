import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaEye } from "react-icons/fa";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loaders from "./../../../components/Loaders";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const [isEdit, setIsEdit] = useState(false);

  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["userInfo", authUser],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-user?email=${authUser.email}`);
      return await res.data;
    },
  });

  return (
    <main className="p-5">
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
              className={`file-input file-input-bordered w-3/4 ${
                !isEdit && "hidden"
              }`}
            />
            <div>
              <button className="btn" onClick={() => setIsEdit(!isEdit)}>
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
            <form>
              <div className="flex flex-col md:flex-row md:gap-5">
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
                  />
                </div>
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
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-5">
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
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.phone}
                    placeholder={!userInfo?.phone ? "Not set" : ""}
                    disabled={!isEdit}
                    className="green-input w-full "
                  />
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <textarea
                  defaultValue={userInfo?.address}
                  placeholder={!userInfo?.address ? "Not set" : ""}
                  disabled={!isEdit}
                  className="textarea bg-transparent border text-base border-green-600 focus:border-green-600 w-full"
                ></textarea>
              </div>
              <div className={`form-control w-full ${!isEdit && "hidden"}`}>
                <button className="green-btn mt-5">Update Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
