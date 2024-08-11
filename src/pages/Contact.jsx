import React, { useState } from "react";
import Footer from "../Components/common/Footer";
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to a server)
    try {
      // Example of sending data to a server
      // await axios.post('/api/contact', formData);

      // Show success toast
      toast.success("Message sent successfully!");

      // Reset form data
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      // Show error toast
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[rgb(142,118,145)] via-[rgba(142,118,145,0.689)] to-[rgba(148,187,233,1)] flex flex-col items-center justify-center py-8 pt-20">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-4xl w-full mx-4 sm:mx-8">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <input
                placeholder="Enter Your Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-transparent text-gray-500 placeholder-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                placeholder="Enter Your Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-gray-500 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-transparent placeholder-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Type Your Message Here..."
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-transparent text-gray-500 placeholder-gray-500"
                rows="6"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <Toaster /> {/* Add Toaster component to show toast notifications */}
    </>
  );
};

export default Contact;


// New code after creating axios instance

// import React, { useState } from "react";
// import Footer from "../Components/common/Footer";
// import toast, { Toaster } from 'react-hot-toast';
// import axiosInstance from '../api/axiosInstance'; // Import the configured Axios instance

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post('/contact', formData);

//       toast.success("Message sent successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         message: "",
//       });
//     } catch (error) {
//       toast.error("Failed to send message. Please try again.");
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-[rgb(142,118,145)] via-[rgba(142,118,145,0.689)] to-[rgba(148,187,233,1)] flex flex-col items-center justify-center py-8 pt-20">
//         <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-4xl w-full mx-4 sm:mx-8">
//           <h1 className="text-4xl font-bold text-white mb-6 text-center">
//             Contact Us
//           </h1>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="mb-4">
//               <input
//                 placeholder="Enter Your Name"
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-transparent text-gray-500 placeholder-gray-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <input
//                 placeholder="Enter Your Email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full text-gray-500 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-transparent placeholder-gray-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <textarea
//                 placeholder="Type Your Message Here..."
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-transparent text-gray-500 placeholder-gray-500"
//                 rows="6"
//                 required
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//       <Toaster />
//     </>
//   );
// };

// export default Contact;
