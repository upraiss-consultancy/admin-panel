import React, { useState } from 'react';
import { FaDownload, FaEye, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserManage = () => {
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);

    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    const data = [{
        No: '1',
        UserId: 'O84LM',
        Nickname: 'Sanakour',
        Dummy: 'O88LM',
        EmailId: 'kourassane...',
        Dummy1: '$100',
        DateTime: '22-12-2023, 4:20 AM',
        Status: 'Active',
        Dummy2: '0.00',
        Login: 'eye'
    },
    {
        No: '2',
        UserId: 'O84LM',
        Nickname: 'Sanakour',
        Dummy: 'O88LM',
        EmailId: 'kourassane...',
        Dummy1: '$100',
        DateTime: '22-12-2023, 4:20 AM',
        Status: 'Active',
        Dummy2: '0.00',
        Login: 'eye'
    },
    {
        No: '3',
        UserId: 'O84LM',
        Nickname: 'Sanakour',
        Dummy: 'O88LM',
        EmailId: 'kourassane...',
        Dummy1: '$100',
        DateTime: '22-12-2023, 4:20 AM',
        Status: 'Active',
        Dummy2: '0.00',
        Login: 'eye'
    },
    {
        No: '4',
        UserId: 'O84LM',
        Nickname: 'Sanakour',
        Dummy: 'O88LM',
        EmailId: 'kourassane...',
        Dummy1: '$100',
        DateTime: '22-12-2023, 4:20 AM',
        Status: 'Active',
        Dummy2: '0.00',
        Login: 'eye'
    },
    {
        No: '5',
        UserId: 'O84LM',
        Nickname: 'Sanakour',
        Dummy: 'O88LM',
        EmailId: 'kourassane...',
        Dummy1: '$100',
        DateTime: '22-12-2023, 4:20 AM',
        Status: 'Active',
        Dummy2: '0.00',
        Login: 'eye'
    },
    ]

    const handleAllCheck = () => {
        const newCheckedItems = {};
        data.forEach(item => {
            newCheckedItems[item.No] = !allChecked;
        });
        setCheckedItems(newCheckedItems);
        setAllChecked(!allChecked);
    };

    const handleCheck = (no) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [no]: !prevState[no]
        }));
    };

    // const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    //     <div className='flex items-center'>
    //         <input
    //             value={value}
    //             onClick={onClick}
    //             ref={ref}
    //             readOnly
    //             className='border-2 rounded-md p-2 w-full bg-black text-white'
    //         />
    //         <FaCalendarAlt onClick={onClick} className='text-white ml-2 cursor-pointer' />
    //     </div>
    // ));
    return (
        <>
            <content className='block p-5 w-screen min-h-screen'>

                <header>
                    <h4 className='text-white'>User Management</h4>
                    <div className='text-white flex items-center justify-end gap-2'>
                        <p>Row</p>
                        <div className='border border-black'>
                            <p className='p-2'>20</p>
                        </div>
                    </div>
                </header>
                <topbar className='flex items-center w-full justify-between mb-10'>
                    <div className='flex items-center gap-3'>
                        <div className='w-5/6'>
                            <p className='text-white'>Search</p>
                            <input type='search' placeholder='Search Email, Nickname Or Referral ID' className='border-2 rounded-md p-2 w-full bg-black' prefix='' />
                        </div>
                        <div className='w-2/4'>
                            <p className='text-white'>Status</p>
                            <select className='border-2 rounded-md p-2 w-full bg-black text-white'>
                                <option value='all'>All</option>
                                <option value='active'>Active</option>
                                <option value='inactive'>Inactive</option>
                                <option value='pending'>Pending</option>
                            </select>
                        </div>
                        <div>
                            <p className='text-white'>From</p>
                            <DatePicker
                                selected={fromDate}
                                onChange={(date) => setFromDate(date)}
                                dateFormat='dd/MM/yyyy'
                                placeholderText='DD/MM/YYYY'
                                className='border-2 rounded-md p-2 w-full bg-black text-white'
                                // customInput={<CustomDateInput />}
                            />
                        </div>
                        <div>
                            <p className='text-white'>To</p>
                            <DatePicker
                                selected={toDate}
                                onChange={(date) => setToDate(date)}
                                dateFormat='dd/MM/yyyy'
                                placeholderText='DD/MM/YYYY'
                                className='border-2 rounded-md p-2 w-full bg-black text-white'
                                // customInput={<CustomDateInput />}
                            />
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div>
                            <p className='text-white rounded-md bg-black p-2'>
                                <FaDownload className='text-white rounded-md bg-black p-2 cursor-pointer' size={20} />
                            </p>
                        </div>
                        <div>
                            <p className='text-white rounded-md bg-black p-2'>Reset</p>
                        </div>
                    </div>
                </topbar>
                <table class="table-auto w-full bg-black rounded-2xl">
                    <thead className='' style={{ borderBottom: '1px solid #FFFFFF' }}>
                        <tr>
                            <th className='p-2 fs-lg font-normal text-white'><input type='checkbox' className='me-3' checked={allChecked} onChange={handleAllCheck}></input>No.</th>
                            <th className='p-2 fs-lg font-normal text-white'>USER ID</th>
                            <th className='p-2 fs-lg font-normal text-white'>Nickname</th>
                            <th className='p-2 fs-lg font-normal text-white'>DUMMY</th>
                            <th className='p-2 fs-lg font-normal text-white'>Email ID</th>
                            <th className='p-2 fs-lg font-normal text-white'>DUMMY</th>
                            <th className='p-2 fs-lg font-normal text-white'>Reg. Date & Time</th>
                            <th className='p-2 fs-lg font-normal text-white'>Status</th>
                            <th className='p-2 fs-lg font-normal text-white'>DUMMY</th>
                            <th className='p-2 fs-lg font-normal text-white'>Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((items) => {
                            return (
                                <tr className='text-center' key={items.No}>
                                    <td className='p-2 text-white'><input type='checkbox' className='me-3' checked={checkedItems[items.No] || false} onChange={() => handleCheck(items.No)}></input>{items.No}</td>
                                    <td className='p-2 text-white'>{items.UserId}</td>
                                    <td className='p-2 text-white'>{items.Nickname}</td>
                                    <td className='p-2 text-white'>{items.Dummy}</td>
                                    <td className='p-2 text-white'>{items.EmailId}</td>
                                    <td className='p-2 text-white'>{items.Dummy1}</td>
                                    <td className='p-2 text-white'>{items.DateTime}</td>
                                    <td className='p-2 text-white'>{items.Status}</td>
                                    <td className='p-2 text-white'>{items.Dummy2}</td>
                                    <td className='p-2 text-white text-center'><FaEye className='cursor-pointer' /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </content>
        </>
    )
}

export default UserManage