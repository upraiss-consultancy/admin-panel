// import React, { useState } from 'react';
// import UserManage from './Navbar/userDetails';
// import { MdSpaceDashboard } from "react-icons/md";
// import { MdLock } from "react-icons/md";
// import { FaUserCircle } from "react-icons/fa";



// const Dashboard = () => {
//   const [isActive, setIsActive] = useState(0);

//   const handleDashboardClick = () => {
//     console.log("Dashboard tab clicked!");
//     // add code to be executed when the Dashboard tab is clicked
//     setIsActive(0);
   
//   };

//   const handleUserDetailsClick = () => {
//     console.log("User details tab clicked!");
//     // add code to be executed when the User details tab is clicked
//     setIsActive(1);
//   };

//   const tabs = ["Dashboard", "User details", "CMS", "Orders/Activity", "Plans/Events", "Support", "Change Pass.", "Admin Manage", "LOGOUT"];
  
//   return (
//     <>
//       <nav className='block flex' style={{ backgroundColor: '#242424' }}>
//         <ul className='bg-black w-2/12 h-min rounded-br-lg rounded-bl-2xl'>
//         <li className='text-white py-10 px-10 text-4xl font-light flex items-center ml-6'>
//             LOGO
//             </li>


           
//           {tabs.map((data, index) => {
//             return (
//               <li
//                 key={index}
//                 className={`text-white py-4 px-10 flex items-center cursor-pointer ${isActive === index ? 'bg-neutral-800' : ''}`}
//                 onClick={() => {
                    
//                 setIsActive(index)
//                 if(data==="Dashboard")handleDashboardClick();
//                 if(data==="User details") handleUserDetailsClick();

            
            
//                 }
//             }
                

               

//               >
//                 {data === "Dashboard" && <MdSpaceDashboard className="mr-2" />}
//                 {data === "User details" && <FaUserCircle className="mr-2" />}
//                 {data === "CMS" && <blank className="mr-6" />}
//                 {data === "Orders/Activity" && <blank className="mr-6" />}
//                 {data === "Plans/Events" && <blank className="mr-6" />}
//                 {data === "Support" && <blank className="mr-6" />}

//                 {data === "Change Pass." && <MdLock className="mr-2" />}
//                 {data === "Admin Manage" && <blank className="mr-6" />}
//                 {data === "LOGOUT" && <blank className="mr-6" />}

                

//                 <a href='#'>
//                   {data}
//                 </a>
//               </li>
//             );
//           })}
//         </ul>
       
//         <UserManage />
        
//       </nav>
//     </>
//   );
// };

// export default Dashboard;




//  a code

import React, { useState } from 'react';
import UserManage from './Navbar/userDetails';
import { MdSpaceDashboard } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import RideManagement from './components/ridemanagement/ridemanagement ';

const DashboardPage = () => {
  return (
    <div className='h-[100vh]'>
      {/* <h1>Dashboard Page</h1> */}
    </div>
  );
};

const Dashboard = () => {
  const [isActive, setIsActive] = useState(0);

  const handleDashboardClick = () => {
    console.log("Dashboard tab clicked!");
    setIsActive(0);
  };
 
  const handleUserDetailsClick = () => {
    console.log("User details tab clicked!");
    setIsActive(1);
  };
 
    const handleClick = (index) => {
        setIsActive(index)
    }

//     const tabs = ["Dashboard", "User details", "CMS", "Orders/Activity", "Plans/Events", "Support", "Change Pass.", "Admin Manage", "LOGOUT"]
//     return (
//         <>
//             <navbar className=' block flex' style={{ backgroundColor: '#242424' }}>
//                 <ul className='bg-black w-2/12 h-min rounded-br-lg rounded-bl-2xl'>
//                     {tabs.map((data, index) => {
//                         return (
//                             <li key={index} className={`text-white py-4 px-10 cursor-pointer ${isActive === index ? 'bg-gray-700' : ''}`} onClick={() => handleClick(index)}>
//                                 <a href='#'>
//                                     {data}
//                                 </a>
//                             </li>
//                         )
//                     })}
//                 </ul>
//                 <UserManage />
//             </navbar>
//         </>
//     )
// }
 
  const handleRideMgmntClick = () => {
    console.log("User details tab clicked!");
    setIsActive(2);
  };

  const tabs = ["Dashboard", "User details", "Ride Management", "Orders/Activity", "Plans/Events", "Support", "Change Pass.", "Admin Manage", "LOGOUT"];

  return (
    <>
      <nav className='block flex' style={{ backgroundColor: '#242424' }}>
        <ul className='bg-black w-2/12 h-min rounded-br-lg rounded-bl-2xl'>
          <li className='text-white py-10 px-10 text-4xl font-light flex items-center ml-6'>
            LOGO
          </li>

          {tabs.map((data, index) => {
            return (
              <li
                key={index}
                className={`text-white py-4 px-10 flex items-center cursor-pointer ${isActive === index? 'bg-neutral-800' : ''}`}
                onClick={() => {
                  setIsActive(index);
                  if (data === "Dashboard") handleDashboardClick();
                  if (data === "User details") handleUserDetailsClick();
                  if (data === "Ride Management") handleRideMgmntClick();
                }}
              >
                {data === "Dashboard" && <MdSpaceDashboard className="mr-2" />}
                {data === "User details" && <FaUserCircle className="mr-2" />}
                {data === "Ride Management" && <blank className="mr-6" />}
                {data === "Orders/Activity" && <blank className="mr-6" />}
                {data === "Plans/Events" && <blank className="mr-6" />}
                {data === "Support" && <blank className="mr-6" />}

                {data === "Change Pass." && <MdLock className="mr-2" />}
                {data === "Admin Manage" && <blank className="mr-6" />}
                {data === "LOGOUT" && <blank className="mr-6" />}

                <a href='#'>
                  {data}
                </a>
              </li>
            );
          })}
        </ul>

        {isActive === 0 && <DashboardPage />}
        {isActive === 1 && <UserManage />}
        {isActive === 2 && <RideManagement />}
      </nav>
    </>
  );
};

export default Dashboard;
















// old code without any change 


 
// import React, { useState } from 'react';
// import UserManage from './Navbar/userDetails';
// import { MdSpaceDashboard, MdLock } from "react-icons/md";
// import { FaUserCircle } from "react-icons/fa";

// const Dashboard = () => {
//   const [isActive, setIsActive] = useState(0);

//   const tabs = ["Dashboard", "User details", "CMS", "Orders/Activity", "Plans/Events", "Support", "Change Pass.", "Admin Manage", "LOGOUT"];

//   return (
//     <>
//       <nav className='block flex' style={{ backgroundColor: '#242424' }}>
//         <ul className='bg-black w-2/12 h-min rounded-br-lg rounded-bl-2xl'>
//           {/* Logo Text */}
//           <li className='text-white py-4 px-10 text-2xl font-bold flex items-center'>
//             LOGO
//           </li>
//           {tabs.map((data, index) => {
//             return (
//               <li
//                 key={index}
//                 className={`text-white py-4 px-10 flex items-center cursor-pointer ${isActive === index ? 'bg-gray-700' : ''}`}
//                 onClick={() => setIsActive(index)}
//               >
//                 {data === "Dashboard" && <MdSpaceDashboard className="mr-2" />}
//                 {data === "User details" && <FaUserCircle className="mr-2" />}
//                 {data === "Change Pass." && <MdLock className="mr-2" />}
//                 {/* Add placeholders for the icons */}
//                 {data !== "Dashboard" && data !== "User details" && data !== "Change Pass." && <span className="mr-6" />}
//                 <a href='#'>
//                   {data}
//                 </a>
//               </li>
//             );
//           })}
//         </ul>
//         <UserManage />
//       </nav>
//     </>
//   );
// };

// export default Dashboard;
