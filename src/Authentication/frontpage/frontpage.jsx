import React from 'react'
import "./frontpage.css"
const Frontpage = () => {
  return (
    <div className='main-div'>
      <div className='child-div'>
        <input className='input'  type="email" placeholder='EMAIL' />
        <input className='input'  type="password" placeholder='Password' />
        <input className='input'  type="text" placeholder='Full Name' />
        <input className='input'  type="text" placeholder='Mobile' />
        <select className='input' name="" id="">
          <option className='input-option' value="">Designation</option>
          <option className='input-option' value="">L1</option>
          <option className='input-option' value="">L2</option>
          <option className='input-option' value="">L3</option>
        </select>
        <input className='input'  type="text" placeholder='Role' />
        <button className='input' >NEXT</button>
      </div>
    </div>
  )
}
export default Frontpage;