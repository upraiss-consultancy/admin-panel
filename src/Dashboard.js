import React, { useState } from 'react'
import UserManage from './Navbar/userDetails'

const Dashboard = () => {

    const [isActive, setIsActive] = useState(0);

    const tabs = ["Dashboard", "User details", "CMS", "Orders/Activity", "Plans/Events", "Support", "Change Pass.", "Admin Manage", "LOGOUT"]
    return (
        <>
            <navbar className=' block flex' style={{ backgroundColor: '#242424' }}>
                <ul className='bg-black w-2/12 h-min rounded-br-lg rounded-bl-2xl'>
                    {tabs.map((data) => {
                        return (
                            <li className='text-white py-4 px-10 '>
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