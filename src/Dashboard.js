import React, { useState } from 'react'
import UserManage from './Navbar/userDetails'

const Dashboard = () => {

    const [isActive, setIsActive] = useState(0);

    const handleClick = (index) => {
        setIsActive(index)
    }

    const tabs = ["Dashboard", "User details", "CMS", "Orders/Activity", "Plans/Events", "Support", "Change Pass.", "Admin Manage", "LOGOUT"]
    return (
        <>
            <navbar className=' block flex' style={{ backgroundColor: '#242424' }}>
                <ul className='bg-black w-2/12 h-min rounded-br-lg rounded-bl-2xl'>
                    {tabs.map((data, index) => {
                        return (
                            <li key={index} className={`text-white py-4 px-10 cursor-pointer ${isActive === index ? 'bg-gray-700' : ''}`} onClick={() => handleClick(index)}>
                                <a href='#'>
                                    {data}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <UserManage />
            </navbar>
        </>
    )
}

export default Dashboard