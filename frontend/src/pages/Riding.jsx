import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full top-2 right-2 z-10'>
            <i className="text-lg font-bold ri-home-4-line"></i>
        </Link>
      <div className='h-1/2'>
        <img className='h-full w-full object-cover' src="https://turnaroundtalk.co.za/wp-content/uploads/2021/10/Uber-car-map.jpg" alt="" />
      </div>
      <div className='h-1/2'>
        <div className='flex items-center justify-between'>
          <img className='h-20' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className='text-right'>
            <h2 className='text-lg font-medium'>Abhishek</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP26 PA 5484</h4>
            <p className='text-lg text-gray-600'>Creta</p>
          </div>
        </div>
        
        <div className='flex gap-2 justify-between items-center flex-col'>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-t-2 border-gray-300'>
                    <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahmedabad</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-t-2 border-gray-300'>
                 <i className="text-xl ri-currency-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Rs. 320.45</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>
            </div>
        </div>
        <button className='w-full text-xl text-white font-bold bg-black p-2 rounded-xl mt-5'>Make a Payment</button>
      </div>
    </div>
  )
}

export default Riding
