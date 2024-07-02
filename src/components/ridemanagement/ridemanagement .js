import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { RiFileCopyLine } from "react-icons/ri";
import Pagination from "../../components/pagination";
import BookingForm from "../form/form";
import { Link } from "react-router-dom";

const UserManage = () => {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 6;

  const data = [
    // Sample data here
    // ...
    {
      No: "1",
      UserId: "O84LM",
      Nickname: "Sanakour",
      Dummy: "O88LM",
      EmailId: "kourassane...",
      Dummy1: "$100",
      DateTime: "22-12-2023, 4:20 AM",
      Status: "Active",
      Dummy2: "0.00",
      Login: "eye",
    },
    {
      No: "2",
      UserId: "O84LM",
      Nickname: "Sanakour",
      Dummy: "O88LM",
      EmailId: "kourassane...",
      Dummy1: "$100",
      DateTime: "22-12-2023, 4:20 AM",
      Status: "Active",
      Dummy2: "0.00",
      Login: "eye",
    },
    {
      No: "3",
      UserId: "O84LM",
      Nickname: "Sanakour",
      Dummy: "O88LM",
      EmailId: "kourassane...",
      Dummy1: "$100",
      DateTime: "22-12-2023, 4:20 AM",
      Status: "Active",
      Dummy2: "0.00",
      Login: "eye",
    },
    {
      No: "4",
      UserId: "O84LM",
      Nickname: "Sanakour",
      Dummy: "O88LM",
      EmailId: "kourassane...",
      Dummy1: "$100",
      DateTime: "22-12-2023, 4:20 AM",
      Status: "Active",
      Dummy2: "0.00",
      Login: "eye",
    },
    {
      No: "5",
      UserId: "O84LM",
      Nickname: "Sanakour",
      Dummy: "O88LM",
      EmailId: "kourassane...",
      Dummy1: "$100",
      DateTime: "22-12-2023, 4:20 AM",
      Status: "Active",
      Dummy2: "0.00",
      Login: "eye",
    },
    {
      No: "6",
      UserId: "O84LM",
      Nickname: "Sanakour",
      Dummy: "O88LM",
      EmailId: "kourassane...",
      Dummy1: "$100",
      DateTime: "22-12-2023, 4:20 AM",
      Status: "Active",
      Dummy2: "0.00",
      Login: "eye",
    },
    {
      No: "7",
      UserId: "O84LM",
      Nickname: "Sanakour",
      Dummy: "O88LM",
      EmailId: "kourassane...",
      Dummy1: "$100",
      DateTime: "22-12-2023, 4:20 AM",
      Status: "Active",
      Dummy2: "0.00",
      Login: "eye",
    },
    {
      No: "8",
      UserId: "O84LM",
      Nickname: "Sanakour",
      Dummy: "O88LM",
      EmailId: "kourassane...",
      Dummy1: "$100",
      DateTime: "22-12-2023, 4:20 AM",
      Status: "Active",
      Dummy2: "0.00",
      Login: "eye",
    },
    {
      No: "9",
      UserId: "O84LM",
      Nickname: "Sanakour",
      Dummy: "O88LM",
      EmailId: "kourassane...",
      Dummy1: "$100",
      DateTime: "22-12-2023, 4:20 AM",
      Status: "Active",
      Dummy2: "0.00",
      Login: "eye",
    },
    {
      No: "10",
      UserId: "O84LM",
      Nickname: "Sanakour",
      Dummy: "O88LM",
      EmailId: "kourassane...",
      Dummy1: "$100",
      DateTime: "22-12-2023, 4:20 AM",
      Status: "Active",
      Dummy2: "0.00",
      Login: "eye",
    },
  ];

  const handleAllCheck = () => {
    const newCheckedItems = {};
    data.forEach((item) => {
      newCheckedItems[item.No] = !allChecked;
    });
    setCheckedItems(newCheckedItems);
    setAllChecked(!allChecked);
  };

  const handleCheck = (no) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [no]: !prevState[no],
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateRideClick = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="block p-5 w-screen min-h-screen">
      {!showForm ? (
        <>
          <header>
            <div className="text-white flex items-center justify-end gap-2"></div>
          </header>
          <div className="flex items-center w-full justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-5/6">
                <button onClick={handleCreateRideClick} className="text-white bg-black p-2 rounded-md w-[150px]">
                  Create Ride
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3"></div>
          </div>
          <table className="table-auto w-full bg-black rounded-2xl">
            <thead className="" style={{ borderBottom: "1px solid #FFFFFF" }}>
              <tr>
                <th className="p-2 fs-lg font-normal text-white">ID</th>
                <th className="p-2 fs-lg font-normal text-white">Date/Time</th>
                <th className="p-2 fs-lg font-normal text-white">Type(intercity/Outstation)</th>
                <th className="p-2 fs-lg font-normal text-white">Round One way</th>
                <th className="p-2 fs-lg font-normal text-white">Driver Name</th>
                <th className="p-2 fs-lg font-normal text-white">Driver Mobile</th>
                <th className="p-2 fs-lg font-normal text-white">Request Count</th>
                <th className="p-2 fs-lg font-normal text-white">Edit</th>
                <th className="p-2 fs-lg font-normal text-white">View</th>
                <th className="p-2 fs-lg font-normal text-white">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((items) => (
                <tr className="text-center" key={items.No}>
                  <td className="p-2 text-white">{items.No}</td>
                  <td className="flex items-center gap-2 p-2 fs-lg font-normal text-white w-[60px]">
                    <div className="flex items-center gap-1">
                      <span>{items.UserId}</span> <RiFileCopyLine />
                    </div>
                  </td>
                  <td className="p-2 fs-lg font-normal text-white w-[150px]">
                    <div className="flex items-center gap-1">
                      <span>{items.Nickname}</span> <RiFileCopyLine />
                    </div>
                  </td>
                  <td className="p-2 fs-lg font-normal text-white w-[120px]">
                    <div className="flex items-center gap-1">
                      <span>{items.Dummy}</span> <RiFileCopyLine />
                    </div>
                  </td>
                  <td className="p-2 fs-lg font-normal text-white w-[150px]">
                    <div className="flex items-center gap-1">
                      <span>{items.EmailId}</span> <RiFileCopyLine />
                    </div>
                  </td>
                  <td className="p-2 text-white">{items.Dummy1}</td>
                  <td className="p-2 text-white">{items.DateTime}</td>
                  <td className="p-2 text-white">{items.Status}</td>
                  <td className="p-2 text-white">{items.Dummy2}</td>
                  <td className="p-2 text-white text-center">
                    <FaEye className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="w-full">
          <button onClick={closeForm} className="text-white bg-black p-2 rounded-md mb-4">
            Back
          </button>
          <BookingForm />
        </div>
      )}
    </div>
  );
};

export default UserManage;




// old code
// import React, { useState } from "react";
// import { FaEye } from "react-icons/fa";
// import { RiFileCopyLine } from "react-icons/ri";
// import Pagination from "../../components/pagination";
// import BookingForm from "../form/form";
// import { Link } from "react-router-dom";

// const UserManage = () => {
//   const [fromDate, setFromDate] = React.useState(null);
//   const [toDate, setToDate] = React.useState(null);
//   const [allChecked, setAllChecked] = useState(false);
//   const [checkedItems, setCheckedItems] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const itemsPerPage = 6;

//   const data = [
//     // Sample data here
    // {
    //   No: "1",
    //   UserId: "O84LM",
    //   Nickname: "Sanakour",
    //   Dummy: "O88LM",
    //   EmailId: "kourassane...",
    //   Dummy1: "$100",
    //   DateTime: "22-12-2023, 4:20 AM",
    //   Status: "Active",
    //   Dummy2: "0.00",
    //   Login: "eye",
    // },
    // {
    //   No: "2",
    //   UserId: "O84LM",
    //   Nickname: "Sanakour",
    //   Dummy: "O88LM",
    //   EmailId: "kourassane...",
    //   Dummy1: "$100",
    //   DateTime: "22-12-2023, 4:20 AM",
    //   Status: "Active",
    //   Dummy2: "0.00",
    //   Login: "eye",
    // },
    // {
    //   No: "3",
    //   UserId: "O84LM",
    //   Nickname: "Sanakour",
    //   Dummy: "O88LM",
    //   EmailId: "kourassane...",
    //   Dummy1: "$100",
    //   DateTime: "22-12-2023, 4:20 AM",
    //   Status: "Active",
    //   Dummy2: "0.00",
    //   Login: "eye",
    // },
    // {
    //   No: "4",
    //   UserId: "O84LM",
    //   Nickname: "Sanakour",
    //   Dummy: "O88LM",
    //   EmailId: "kourassane...",
    //   Dummy1: "$100",
    //   DateTime: "22-12-2023, 4:20 AM",
    //   Status: "Active",
    //   Dummy2: "0.00",
    //   Login: "eye",
    // },
    // {
    //   No: "5",
    //   UserId: "O84LM",
    //   Nickname: "Sanakour",
    //   Dummy: "O88LM",
    //   EmailId: "kourassane...",
    //   Dummy1: "$100",
    //   DateTime: "22-12-2023, 4:20 AM",
    //   Status: "Active",
    //   Dummy2: "0.00",
    //   Login: "eye",
    // },
    // {
    //   No: "6",
    //   UserId: "O84LM",
    //   Nickname: "Sanakour",
    //   Dummy: "O88LM",
    //   EmailId: "kourassane...",
    //   Dummy1: "$100",
    //   DateTime: "22-12-2023, 4:20 AM",
    //   Status: "Active",
    //   Dummy2: "0.00",
    //   Login: "eye",
    // },
    // {
    //   No: "7",
    //   UserId: "O84LM",
    //   Nickname: "Sanakour",
    //   Dummy: "O88LM",
    //   EmailId: "kourassane...",
    //   Dummy1: "$100",
    //   DateTime: "22-12-2023, 4:20 AM",
    //   Status: "Active",
    //   Dummy2: "0.00",
    //   Login: "eye",
    // },
    // {
    //   No: "8",
    //   UserId: "O84LM",
    //   Nickname: "Sanakour",
    //   Dummy: "O88LM",
    //   EmailId: "kourassane...",
    //   Dummy1: "$100",
    //   DateTime: "22-12-2023, 4:20 AM",
    //   Status: "Active",
    //   Dummy2: "0.00",
    //   Login: "eye",
    // },
    // {
    //   No: "9",
    //   UserId: "O84LM",
    //   Nickname: "Sanakour",
    //   Dummy: "O88LM",
    //   EmailId: "kourassane...",
    //   Dummy1: "$100",
    //   DateTime: "22-12-2023, 4:20 AM",
    //   Status: "Active",
    //   Dummy2: "0.00",
    //   Login: "eye",
    // },
    // {
    //   No: "10",
    //   UserId: "O84LM",
    //   Nickname: "Sanakour",
    //   Dummy: "O88LM",
    //   EmailId: "kourassane...",
    //   Dummy1: "$100",
    //   DateTime: "22-12-2023, 4:20 AM",
    //   Status: "Active",
    //   Dummy2: "0.00",
    //   Login: "eye",
    // },


//   ];

//   const handleAllCheck = () => {
//     const newCheckedItems = {};
//     data.forEach((item) => {
//       newCheckedItems[item.No] = !allChecked;
//     });
//     setCheckedItems(newCheckedItems);
//     setAllChecked(!allChecked);
//   };

//   const handleCheck = (no) => {
//     setCheckedItems((prevState) => ({
//       ...prevState,
//       [no]: !prevState[no],
//     }));
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleSearchClick = () => {
//     console.log("Search button clicked");
//     // Add your search logic here
//   };

//   const handleCreateRideClick = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const paginatedData = data.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   return (
//     <>
//       {!showModal && (
//         <div className="block p-5 w-screen min-h-screen">
//           <header>
//             <div className="text-white flex items-center justify-end gap-2"></div>
//           </header>
//           <div className="flex items-center w-full justify-between mb-10">
//             <div className="flex items-center gap-3">
//               <div className="w-5/6">
//                <Link to="/createride"> <button onClick={handleCreateRideClick} className="text-white bg-black p-2 rounded-md w-[150px]">
//                   Create Ride
//                 </button></Link >
                
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3"></div>
//           </div>
//           <table className="table-auto w-full bg-black rounded-2xl">
//             <thead className="" style={{ borderBottom: "1px solid #FFFFFF" }}>
//               <tr>
//                 <th className="p-2 fs-lg font-normal text-white">ID</th>
//                 <th className="p-2 fs-lg font-normal text-white">Date/Time</th>
//                 <th className="p-2 fs-lg font-normal text-white">Type(intercity/Outstation)</th>
//                 <th className="p-2 fs-lg font-normal text-white">Round One way</th>
//                 <th className="p-2 fs-lg font-normal text-white">Driver Name</th>
//                 <th className="p-2 fs-lg font-normal text-white">Driver Mobile</th>
//                 <th className="p-2 fs-lg font-normal text-white">Request Count</th>
//                 <th className="p-2 fs-lg font-normal text-white">Edit</th>
//                 <th className="p-2 fs-lg font-normal text-white">View</th>
//                 <th className="p-2 fs-lg font-normal text-white">Cancel</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((items) => (
//                 <tr className="text-center" key={items.No}>
//                   <td className="p-2 text-white">{items.No}</td>
//                   <td className="flex items-center gap-2 p-2 fs-lg font-normal text-white w-[60px]">
//                     <div className="flex items-center gap-1">
//                       <span>{items.UserId}</span> <RiFileCopyLine />
//                     </div>
//                   </td>
//                   <td className="p-2 fs-lg font-normal text-white w-[150px]">
//                     <div className="flex items-center gap-1">
//                       <span>{items.Nickname}</span> <RiFileCopyLine />
//                     </div>
//                   </td>
//                   <td className="p-2 fs-lg font-normal text-white w-[120px]">
//                     <div className="flex items-center gap-1">
//                       <span>{items.Dummy}</span> <RiFileCopyLine />
//                     </div>
//                   </td>
//                   <td className="p-2 fs-lg font-normal text-white w-[150px]">
//                     <div className="flex items-center gap-1">
//                       <span>{items.EmailId}</span> <RiFileCopyLine />
//                     </div>
//                   </td>
//                   <td className="p-2 text-white">{items.Dummy1}</td>
//                   <td className="p-2 text-white">{items.DateTime}</td>
//                   <td className="p-2 text-white">{items.Status}</td>
//                   <td className="p-2 text-white">{items.Dummy2}</td>
//                   <td className="p-2 text-white text-center">
//                     <FaEye className="cursor-pointer" />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             handlePageChange={handlePageChange}
//           />
//         </div>
//       )}

//       {/* {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-5 rounded-md">
//             <button onClick={closeModal} className="text-black p-2 rounded-md">
//               Close
//             </button>
//             <BookingForm />
//           </div>
//         </div>
//       )} */}
//     </>
//   );
// };

// export default UserManage;


// import React, { useState } from "react";
// import { FaEye } from "react-icons/fa";
// import { RiFileCopyLine } from "react-icons/ri";
// import Pagination from "../../components/pagination";
// import BookingForm from "./BookingForm";

// const UserManage = () => {
//   const [fromDate, setFromDate] = React.useState(null);
//   const [toDate, setToDate] = React.useState(null);
//   const [allChecked, setAllChecked] = useState(false);
//   const [checkedItems, setCheckedItems] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const itemsPerPage = 6;

//   const data = [
//     {
//       No: "1",
//       UserId: "O84LM",
//       Nickname: "Sanakour",
//       Dummy: "O88LM",
//       EmailId: "kourassane...",
//       Dummy1: "$100",
//       DateTime: "22-12-2023, 4:20 AM",
//       Status: "Active",
//       Dummy2: "0.00",
//       Login: "eye",
//     },
//     {
//       No: "2",
//       UserId: "O84LM",
//       Nickname: "Sanakour",
//       Dummy: "O88LM",
//       EmailId: "kourassane...",
//       Dummy1: "$100",
//       DateTime: "22-12-2023, 4:20 AM",
//       Status: "Active",
//       Dummy2: "0.00",
//       Login: "eye",
//     },
//     {
//       No: "3",
//       UserId: "O84LM",
//       Nickname: "Sanakour",
//       Dummy: "O88LM",
//       EmailId: "kourassane...",
//       Dummy1: "$100",
//       DateTime: "22-12-2023, 4:20 AM",
//       Status: "Active",
//       Dummy2: "0.00",
//       Login: "eye",
//     },
//     {
//       No: "4",
//       UserId: "O84LM",
//       Nickname: "Sanakour",
//       Dummy: "O88LM",
//       EmailId: "kourassane...",
//       Dummy1: "$100",
//       DateTime: "22-12-2023, 4:20 AM",
//       Status: "Active",
//       Dummy2: "0.00",
//       Login: "eye",
//     },
//     {
//       No: "5",
//       UserId: "O84LM",
//       Nickname: "Sanakour",
//       Dummy: "O88LM",
//       EmailId: "kourassane...",
//       Dummy1: "$100",
//       DateTime: "22-12-2023, 4:20 AM",
//       Status: "Active",
//       Dummy2: "0.00",
//       Login: "eye",
//     },
//     {
//       No: "6",
//       UserId: "O84LM",
//       Nickname: "Sanakour",
//       Dummy: "O88LM",
//       EmailId: "kourassane...",
//       Dummy1: "$100",
//       DateTime: "22-12-2023, 4:20 AM",
//       Status: "Active",
//       Dummy2: "0.00",
//       Login: "eye",
//     },
//     {
//       No: "7",
//       UserId: "O84LM",
//       Nickname: "Sanakour",
//       Dummy: "O88LM",
//       EmailId: "kourassane...",
//       Dummy1: "$100",
//       DateTime: "22-12-2023, 4:20 AM",
//       Status: "Active",
//       Dummy2: "0.00",
//       Login: "eye",
//     },
//     {
//       No: "8",
//       UserId: "O84LM",
//       Nickname: "Sanakour",
//       Dummy: "O88LM",
//       EmailId: "kourassane...",
//       Dummy1: "$100",
//       DateTime: "22-12-2023, 4:20 AM",
//       Status: "Active",
//       Dummy2: "0.00",
//       Login: "eye",
//     },
//     {
//       No: "9",
//       UserId: "O84LM",
//       Nickname: "Sanakour",
//       Dummy: "O88LM",
//       EmailId: "kourassane...",
//       Dummy1: "$100",
//       DateTime: "22-12-2023, 4:20 AM",
//       Status: "Active",
//       Dummy2: "0.00",
//       Login: "eye",
//     },
//     {
//       No: "10",
//       UserId: "O84LM",
//       Nickname: "Sanakour",
//       Dummy: "O88LM",
//       EmailId: "kourassane...",
//       Dummy1: "$100",
//       DateTime: "22-12-2023, 4:20 AM",
//       Status: "Active",
//       Dummy2: "0.00",
//       Login: "eye",
//     },
//   ];

//   const handleAllCheck = () => {
//     const newCheckedItems = {};
//     data.forEach((item) => {
//       newCheckedItems[item.No] = !allChecked;
//     });
//     setCheckedItems(newCheckedItems);
//     setAllChecked(!allChecked);
//   };

//   const handleCheck = (no) => {
//     setCheckedItems((prevState) => ({
//       ...prevState,
//       [no]: !prevState[no],
//     }));
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleSearchClick = () => {
//     console.log("Search button clicked");
//     // Add your search logic here
//   };

//   const handleCreateRideClick = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const paginatedData = data.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   return (
//     <>
//       <div className="block p-5 w-screen min-h-screen">
//         <header>
//           <div className="text-white flex items-center justify-end gap-2">
//           </div>
//         </header>
//         <div className="flex items-center w-full justify-between mb-10">
//           <div className="flex items-center gap-3">
//             <div className="w-5/6">
//               <button onClick={handleCreateRideClick} className="text-white bg-black p-2 rounded-md w-[150px]">
//                 Create Ride
//               </button>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//           </div>
//         </div>
//         <table className="table-auto w-full bg-black rounded-2xl">
//           <thead className="" style={{ borderBottom: "1px solid #FFFFFF" }}>
//             <tr>
//               <th className="p-2 fs-lg font-normal text-white">ID</th>
//               <th className="p-2 fs-lg font-normal text-white">Date/Time</th>
//               <th className="p-2 fs-lg font-normal text-white">Type(intercity/Outstation)</th>
//               <th className="p-2 fs-lg font-normal text-white">Round One way</th>
//               <th className="p-2 fs-lg font-normal text-white">Driver Name</th>
//               <th className="p-2 fs-lg font-normal text-white">Driver Mobile</th>
//               <th className="p-2 fs-lg font-normal text-white">Request Count</th>
//               <th className="p-2 fs-lg font-normal text-white">Edit</th>
//               <th className="p-2 fs-lg font-normal text-white">View</th>
//               <th className="p-2 fs-lg font-normal text-white">Cancel</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((items) => (
//               <tr className="text-center" key={items.No}>
//                 <td className="p-2 text-white">{items.No}</td>
//                 <td className="flex items-center gap-2 p-2 fs-lg font-normal text-white w-[60px]">
//                   <div className="flex items-center gap-1">
//                     <span>{items.UserId}</span> <RiFileCopyLine />
//                   </div>
//                 </td>
//                 <td className="p-2 fs-lg font-normal text-white w-[150px]">
//                   <div className="flex items-center gap-1">
//                     <span>{items.Nickname}</span> <RiFileCopyLine />
//                   </div>
//                 </td>
//                 <td className="p-2 fs-lg font-normal text-white w-[120px]">
//                   <div className="flex items-center gap-1">
//                     <span>{items.Dummy}</span> <RiFileCopyLine />
//                   </div>
//                 </td>
//                 <td className="p-2 fs-lg font-normal text-white w-[150px]">
//                   <div className="flex items-center gap-1">
//                     <span>{items.EmailId}</span> <RiFileCopyLine />
//                   </div>
//                 </td>
//                 <td className="p-2 text-white">{items.Dummy1}</td>
//                 <td className="p-2 text-white">{items.DateTime}</td>
//                 <td className="p-2 text-white">{items.Status}</td>
//                 <td className="p-2 text-white">{items.Dummy2}</td>
//                 <td className="p-2 text-white text-center">
//                   <FaEye className="cursor-pointer" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           handlePageChange={handlePageChange}
//         />
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-5 rounded-md">
//             <button onClick={closeModal} className="text-black p-2 rounded-md">
//               Close
//             </button>
//             <BookingForm/>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserManage;

