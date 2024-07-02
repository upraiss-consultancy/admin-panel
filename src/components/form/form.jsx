// import React, { useState } from 'react';

// const BookingForm = () => {
//   const [outstation, setOutstation] = useState('');
//   const [tripType, setTripType] = useState(false);
//   const [pickupAddress, setPickupAddress] = useState('');
//   const [dropAddress, setDropAddress] = useState('');
//   const [carType, setCarType] = useState('');
//   const [carName, setCarName] = useState('');
//   const [pickupTime, setPickupTime] = useState('');
//   const [packageType, setPackageType] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({
//       outstation,
//       tripType,
//       pickupAddress,
//       dropAddress,
//       carType,
//       carName,
//       pickupTime,
//       packageType,
//     });
//     // const handleSubmitClick = () => {
//     //     console.log("Search button clicked");
//     //     // Add your search logic here
//     //   };
//     // Send the form data to a server or perform some other action
//   };

//   return (
    
//     <form onSubmit={handleSubmit}>
//       <div className="form-row h-fit">
//         <label htmlFor="outstation">Outstation/Intercity:</label>
//         <input
//           type="text"
//           id="outstation"
//           value={outstation}
//           onChange={(e) => setOutstation(e.target.value)}
//         />
//         <label htmlFor="trip-type">One Way:</label>
//         <input
//           type="text"
//           id="trip-type"
//           checked={tripType}
//           onChange={(e) => setTripType(e.target.checked)}
//         />
//       </div>
//       <div className="form-row">
//         <label htmlFor="pickup-address">Pickup Address:</label>
//         <input
//           type="text"
//           id="pickup-address"
//           value={pickupAddress}
//           onChange={(e) => setPickupAddress(e.target.value)}
//         />
//       </div>
//       <div className="form-row">
//         <label htmlFor="drop-address">Drop Address:</label>
//         <input
//           type="text"
//           id="drop-address"
//           value={dropAddress}
//           onChange={(e) => setDropAddress(e.target.value)}
//         />
//       </div>
//       <div className="form-row">
//         <label htmlFor="car-type">Car Type:</label>
//         <input
//           type="text"
//           id="car-type"
//           value={carType}
//           onChange={(e) => setCarType(e.target.value)}
//         />
//         <label htmlFor="car-name">Car Name:</label>
//         <input
//           type="text"
//           id="car-name"
//           value={carName}
//           onChange={(e) => setCarName(e.target.value)}
//         />
//       </div>
//       <div className="form-row">
//         <label htmlFor="pickup-time">Pickup Time:</label>
//         <input
//           type="datetime-local"
//           id="pickup-time"
//           value={pickupTime}
//           onChange={(e) => setPickupTime(e.target.value)}
//         />
//         <label htmlFor="package">Select Package:</label>
//         <select
//           id="package"
//           value={packageType}
//           onChange={(e) => setPackageType(e.target.value)}
//         >
//           <option value="">Select Package</option>
//           <option value="basic">Basic</option>
//           <option value="premium">Premium</option>
//         </select>
//       </div>
//       <div className="form-row">
//         <button type="submit">Continue</button>
//       </div>
//       {/* handleSubmitClick={handleSubmitClick} */}
//     </form>
              

//   );
// };

// export default BookingForm;



// import React, { useState } from 'react';


// const BookingForm = () => {
//   const [formData, setFormData] = useState({
//     outstation: '',
//     oneWayRound: '',
//     pickupAddress: '',
//     dropAddress: '',
//     carType: '',
//     carName: '',
//     pickupTime: '',
//     package: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log(formData);
//   };

//   const handleSubmitClick = () => {
//         console.log("Search button clicked");
//         // Add your search logic here
//       };
  


//   return (
//     <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <div>
//         <button type="button" name="outstation" value="Outstation/Intercity" onClick={handleChange}>Outstation/Intercity</button>
//         <button type="button" name="oneWayRound" value="One Way/Round" onClick={handleChange}>One Way/Round</button>
//       </div>
//       <input
//         type="text"
//         name="pickupAddress"
//         placeholder="Pickup Address"
//         value={formData.pickupAddress}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="dropAddress"
//         placeholder="Drop Address (In case of one way only)"
//         value={formData.dropAddress}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="carType"
//         placeholder="Car Type"
//         value={formData.carType}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="carName"
//         placeholder="Car Name"
//         value={formData.carName}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="pickupTime"
//         placeholder="Pickup Time"
//         value={formData.pickupTime}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="package"
//         placeholder="Select Package"
//         value={formData.package}
//         onChange={handleChange}
//       />
//       <button type="submit">Continue</button>
//     </form>
//   );
// };

// export default BookingForm;


import React, { useState } from 'react';

const BookingForm = () => {
   
  const [formData, setFormData] = useState({
    outstation: '',
    oneWayRound: '',
    pickupAddress: '',
    dropAddress: '',
    carType: '',
    carName: '',
    pickupTime: '',
    package: ''
    
  });
  

//   const BookingForm = () => {
//     return (
//       <div className='h-[100vh]'>
//         {/* <h1>Dashboard Page</h1> */}
//       </div>
//     );
//   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className='h-[100vh]'>
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col items-center bg-black text-white h-full w-full p-10 space-y-4"
    >
       <div className="flex space-x-4">
        <input
          type="text"
          name="outstation"
          placeholder="Outstation/Intercity"
          value={formData.outstation}
          onChange={handleChange}
          className="bg-neutral-700 p-2 rounded text-white"
        />
        <input
          type="text"
          name="oneWayRound"
          placeholder="One Way/Round"
          value={formData.oneWayRound}
          onChange={handleChange}
          className="bg-neutral-700 p-2 rounded text-white"
        />
      </div>
      <input
        type="text"
        name="pickupAddress"
        placeholder="Pickup Address"
        value={formData.pickupAddress}
        onChange={handleChange}
        className="bg-neutral-700 p-2 rounded w-[420px]"
      />
      <input
        type="text"
        name="dropAddress"
        placeholder="Drop Address (In case of one way only)"
        value={formData.dropAddress}
        onChange={handleChange}
        className="bg-neutral-700 p-2 rounded w-[420px]"
      />

        <div className="flex space-x-4">
        <input
          type="text"
          name="car Type"
          placeholder="Car Type"
          value={formData.carType}
          onChange={handleChange}
          className="bg-neutral-700 p-2 rounded text-white"
        />
        <input
          type="text"
          name="carName"
          placeholder="Car Name"
          value={formData.carName}
          onChange={handleChange}
          className="bg-neutral-700 p-2 rounded text-white"
        />
        </div>


        <div className="flex space-x-4">
        <input
          type="text"
          name="pickupTime"
          placeholder="Pickup Time"
          value={formData.pickupTime}
          onChange={handleChange}
          className="bg-neutral-700 p-2 rounded text-white"
        />
        <input
          type="text"
          name="package"
          placeholder="Select Package"
          value={formData.package}
          onChange={handleChange}
          className="bg-neutral-700 p-2 rounded text-white"
        />
        </div>
      <button 
        type="submit"
        className="bg-neutral-700 p-2 rounded w-[420px] mr-4"
      >
        Continue
      </button>
      
    </form>
    </div>
  );
};

export default BookingForm;
