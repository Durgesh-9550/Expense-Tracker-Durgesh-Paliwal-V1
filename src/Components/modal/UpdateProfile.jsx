import React, { useState } from "react";
import axiosInstance from "../../apis/axiosInstance";
import toast, { ToastBar, Toaster } from "react-hot-toast";

const UpdateProfileModal = ({ user, closeModal }) => {
  const [formData, setFormData] = useState({
    profilePicture: user.profilePicture || "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
    dob: user.dob || "",
    occupation: user.occupation || "",
    about: user.about || "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put("/update_user", formData);
      toast.success("Profile updated successfully");
      closeModal();
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

        <form onSubmit={onSubmit}>
          <label className="block mb-4">
            Profile Picture
            <input
              type="file"
              name="profilePicture"
              className="block w-full text-sm text-gray-900"
              onChange={(e) =>
                setFormData({ ...formData, profilePicture: e.target.files[0] })
              }
            />
          </label>
          <label className="block mb-4">
            Phone Number
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="block mb-4">
            Address
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="block mb-4">
            Date of Birth
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="block mb-4">
            Occupation
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="block mb-4">
            About
            <textarea
              name="about"
              value={formData.about}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default UpdateProfileModal;