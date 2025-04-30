import React from 'react'
import { Link } from 'react-router-dom'

const CaptainRiding = () => {
  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://1000marcas.net/wp-content/uploads/2020/10/Uber-Logo.png" alt="" />
        <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full z-10'>
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://turnaroundtalk.co.za/wp-content/uploads/2021/10/Uber-car-map.jpg" alt="" />
      </div>
      <div className='h-2/5 p-6'>
        
      </div>
    </div>
  )
}

export default CaptainRiding
