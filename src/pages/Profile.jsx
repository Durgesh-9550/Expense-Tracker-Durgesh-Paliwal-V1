import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import UpdateProfileModal from "../Components/modal/UpdateProfile";
import DeleteProfileModal from "../Components/modal/DeleteProfile";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/get_user");
        setUser(response.data.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = () => {
    setIsUpdateModalOpen(true);
  };

  const handleDeleteProfile = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(142,118,145)] via-[rgba(142,118,145,0.689)] to-[rgba(148,187,233,1)] pt-20 overflow-hidden">
      <div className="max-w-2xl mx-auto p-6 rounded-lg bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg">
        {user && (
          <>
            <h1 className="text-3xl font-bold mb-4 flex justify-center items-center">Hi {user.name} 👋</h1>

            <div className="mb-4 flex justify-center">
              <img
                src={user.profilePicture || "/default-profile.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-blue-300"
              />
            </div>

            <div className="mb-4">
              <p className="mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="mb-2">
                <strong>Income:</strong> ₹
                {user.income ||
                  "This field is not there, please update this field."}
              </p>
              <p className="mb-2">
                <strong>Phone Number:</strong>{" "}
                {user.phoneNumber ||
                  "This field is not there, please update this field."}
              </p>
              <p className="mb-2">
                <strong>Address:</strong>{" "}
                {user.address ||
                  "This field is not there, please update this field."}
              </p>
              <p className="mb-2">
                <strong>Date of Birth:</strong>{" "}
                {user.dob
                  ? new Date(user.dob).toLocaleDateString()
                  : "This field is not there, please update this field."}
              </p>
              <p className="mb-2">
                <strong>Occupation:</strong>{" "}
                {user.occupation ||
                  "This field is not there, please update this field."}
              </p>
              <p className="mb-2">
                <strong>About:</strong>{" "}
                {user.about ||
                  "This field is not there, please update this field."}
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleUpdateProfile}
                className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                <AiOutlineEdit className="text-xl mr-2" />
                Update Profile
              </button>

              <button
                onClick={handleDeleteProfile}
                className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                <AiOutlineDelete className="text-xl mr-2" />
                Delete Profile
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {isUpdateModalOpen && (
        <UpdateProfileModal
          user={user}
          closeModal={() => setIsUpdateModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteProfileModal closeModal={() => setIsDeleteModalOpen(false)} />
      )}
    </div>
  );
};

export default ProfilePage;
