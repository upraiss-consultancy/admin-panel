// import React, { useState } from "react";
// import { FaDownload, FaEye, FaCalendarAlt } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { PiCopySimpleBold } from "react-icons/pi";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { FaArrowUpShortWide } from "react-icons/fa6";
// import { RiFileCopyLine } from "react-icons/ri";
// import { TbCalendarEvent } from "react-icons/tb";
// import Pagination from "../../components/pagination";
// // import Pagination from "./Pagination";
// // import Button from '../../components/Button';

// const UserManage = () => {
//   const [fromDate, setFromDate] = React.useState(null);
//   const [toDate, setToDate] = React.useState(null);

//   const [allChecked, setAllChecked] = useState(false);
//   const [checkedItems, setCheckedItems] = useState({});

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

// //   const data = [
// //     // Your data here...
// //   ];

// const data = [
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

//   const paginatedData = data.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   return (
//     <>
//       <content className="block p-5 w-screen min-h-screen">
//         <header>
//           <h4 className="text-white">Book Ride</h4>
//           <div className="text-white flex items-center justify-end gap-2">
//             <p>Row</p>
//             <div className="border-2 rounded-md  border-black px-2">
//               <p className="px-0.5 py-1 flex justify-between">
//                 20
//                 <IoMdArrowDropdown className="text-2xl" />
//               </p>
//             </div>
//           </div>
//         </header>
//         <topbar className="flex items-center w-full justify-between mb-10">
//           <div className="flex items-center gap-3">
//             <div className="w-5/6">
//               <p className="text-white">Create Ride</p>
//               {/* <Button onClick={handleSearchClick} className="text-white bg-black p-2">
//                 Search
//               </Button> */}
//               <input
//                 type="search"
//                 placeholder="Create Ride"
//                 className="border-2 rounded-md p-2 w-full bg-black min-w-[50px]"
//                 prefix=""
//               />
//             </div>
            
//           </div>
//           <div className="flex items-center gap-3">
//             <div>
//               <p className="text-white rounded-md bg-black p-2">
//                 <FaDownload
//                   className="text-white rounded-md bg-black p-1 cursor-pointer"
//                   size={20}
//                 />
//               </p>
//             </div>
//             <div>
//               <p className="text-white rounded-md bg-black p-2">Reset</p>
//             </div>
//           </div>
//         </topbar>
//         <table className="table-auto w-full bg-black rounded-2xl">
//           <thead className="" style={{ borderBottom: "1px solid #FFFFFF" }}>
//             <tr>
//               <th className="p-2 fs-lg font-normal text-white">
//                 {/* <input
//                   type="checkbox"
//                   className="me-3"
//                   checked={allChecked}
//                   onChange={handleAllCheck}
//                 ></input> */}
//                 ID
//               </th>
//               <th className="p-2 fs-lg font-normal text-white">Date/Time</th>
//               <th className="p-2 fs-lg font-normal text-white">Type(intercity/Outstation)</th>
//               <th className="p-2 fs-lg font-normal text-white">Round One way</th>
//               <th className="p-2 fs-lg font-normal text-white">Driver Name</th>
//               <th className="p-2 fs-lg font-normal text-white">Driver Mobile</th>
//               <th className="p-2 fs-lg font-normal text-white">
//                 {/* Reg. Date & Time */}
//                 Request Count
//               </th>
//               <th className="p-2 fs-lg font-normal text-white">Edit</th>
//               <th className="p-2 fs-lg font-normal text-white">View</th>

//               {/* <th className="flex items-center gap-2 p-2 fs-lg font-normal text-white">
//                 <span>Edit</span> <FaArrowUpShortWide className="mt-2 " />
//               </th> */}
//               <th className="p-2 fs-lg font-normal text-white">Cancel</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((items) => {
//               return (
//                 <tr className="text-center" key={items.No}>
//                   <td className="p-2 text-white">
//                     <input
//                       type="checkbox"
//                       className="me-3"
//                       checked={checkedItems[items.No] || false}
//                       onChange={() => handleCheck(items.No)}
//                     ></input>
//                     {items.No}
//                   </td>
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
//               );
//             })}
//           </tbody>
//         </table>
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           handlePageChange={handlePageChange}
//         />
//       </content>
//     </>
//   );
// };

// export default UserManage;


import React, { useState } from "react";
import { FaDownload, FaEye, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PiCopySimpleBold } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaArrowUpShortWide } from "react-icons/fa6";
import { RiFileCopyLine } from "react-icons/ri";
import { TbCalendarEvent } from "react-icons/tb";
import Pagination from "../../components/pagination";
// import Pagination from "./Pagination";
// import Button from '../../components/Button';

const UserManage = () => {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const data = [
    {
      No: "1",
      UserId: "O84LM",
      DateTime: "22-12-2023, 4:20 AM",
      Station: "Outstation",
      Trip: "One Way",
      DriverName: "kouras",
      DriverMobile: "1234576890",
      
      RequestCount: "11",
      Edit: "edit",
      View: "view",
      Cancel: "cancel",
    },
    {
      No: "2",
      UserId: "O84LM",
      DateTime: "22-12-2023, 4:20 AM",
      Station: "Outstation",
      Trip: "Round",
      DriverName: "kouras",
      DriverMobile: "1234576890",
      
      RequestCount: "11",
      Edit: "edit",
      View: "view",
      Cancel: "cancel",
    },
    {
      No: "3",
      UserId: "O84LM",
      DateTime: "22-12-2023, 4:20 AM",
      Station: "Outstation",
      Trip: "One Way",
      DriverName: "kouras",
      DriverMobile: "1234576890",
      
      RequestCount: "11",
      Edit: "edit",
      View: "view",
      Cancel: "cancel",
    },
    {
      No: "4",
      UserId: "O84LM",
      DateTime: "22-12-2023, 4:20 AM",
      Station: "Outstation",
      Trip: "One Way",
      DriverName: "kouras",
      DriverMobile: "1234576890",
      
      RequestCount: "11",
      Edit: "edit",
      View: "view",
      Cancel: "cancel",
    },
    {
      No: "5",
      UserId: "O84LM",
      DateTime: "22-12-2023, 4:20 AM",
      Station: "Outstation",
      Trip: "One Way",
      DriverName: "kouras",
      DriverMobile: "1234576890",
      
      RequestCount: "11",
      Edit: "edit",
      View: "view",
      Cancel: "cancel",
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

  const handleSearchClick = () => {
    console.log("Search button clicked");
    // Add your search logic here
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <content className="block p-5 w-screen min-h-screen">
        <header>
          {/* <h4 className="text-white">Book Ride</h4> */}
          {/* <div className="text-white flex items-center justify-end gap-2">
            <p>Row</p>
            <div className="border-2 rounded-md  border-black px-2">
              <p className="px-0.5 py-1 flex justify-between">
                20
                <IoMdArrowDropdown className="text-2xl" />
              </p>
            </div>
          </div> */}
        </header>
        <topbar className="flex items-center w-full justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-5/6">
              {/* <p className="text-white">Create Ride</p> */}
              {/* Modified: Replaced input search field with a button */}
              <button onClick={handleSearchClick} className="text-white bg-black p-2 rounded-md min-w-[150px]">
                Create Ride
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              {/* <p className="text-white rounded-md bg-black p-2">
                <FaDownload
                  className="text-white rounded-md bg-black p-1 cursor-pointer"
                  size={20}
                />
              </p> */}
            </div>
            {/* <div>
              <p className="text-white rounded-md bg-black p-2">Reset</p>
            </div> */}
          </div>
        </topbar>
        <table className="table-auto w-full bg-black rounded-2xl">
          <thead className="" style={{ borderBottom: "1px solid #FFFFFF" }}>
            <tr>
              <th className="p-2 fs-lg font-normal text-white">
                {/* <input
                  type="checkbox"
                  className="me-3"
                  checked={allChecked}
                  onChange={handleAllCheck}
                ></input> */}
                ID
              </th>
              <th className="p-2 fs-lg font-normal text-white">Date/Time</th>
              <th className="p-2 fs-lg font-normal text-white">Station</th>
              <th className="p-2 fs-lg font-normal text-white">Trip</th>
              <th className="p-2 fs-lg font-normal text-white">Driver Name</th>
              <th className="p-2 fs-lg font-normal text-white">Driver Mobile</th>
              <th className="p-2 fs-lg font-normal text-white">
              Request Count              </th>
              <th className="p-2 fs-lg font-normal text-white">Edit</th>
              <th className="p-2 fs-lg font-normal text-white">View</th>
              <th className="p-2 fs-lg font-normal text-white">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {data.map((items) => {
              return (
                <tr className="text-center" key={items.No}>
                  <td className="p-2 text-white">
                    {/* <input
                      type="checkbox"
                      className="me-3"
                      checked={checkedItems[items.No] || false}
                      onChange={() => handleCheck(items.No)}
                    ></input> */}
                    {items.No}
                  </td>
                  <td className="flex items-center gap-2 p-2 fs-lg font-normal text-white w-[60px]">
                    <div className="flex items-center gap-1">
                      <span>{items.UserId}</span> 
                    </div>
                  </td>
                  <td className="p-2 fs-lg font-normal text-white w-[150px]">
                    <div className="flex items-center gap-1">
                      <span>{items.Nickname}</span> 
                    </div>
                  </td>
                  <td className="p-2 fs-lg font-normal text-white w-[120px]">
                    <div className="flex items-center gap-1">
                      <span>{items.Dummy}</span> 
                    </div>
                  </td>
                  <td className="p-2 fs-lg font-normal text-white w-[150px]">
                    <div className="flex items-center gap-1">
                      <span>{items.EmailId}</span> 
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
              );
            })}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </content>
    </>
  );
};

export default UserManage;

