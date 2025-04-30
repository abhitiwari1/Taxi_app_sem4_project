import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://th.bing.com/th/id/OIP.ffiHtMNY4UaAB36DsgR-UAAAAA?w=136&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7)] h-screen pt-10 flex justify-between flex-col w-full bg-red-400'>
        <img className='w-20 ml-10' src="https://1000marcas.net/wp-content/uploads/2020/10/Uber-Logo.png" alt="" />
        <div className='bg-white px-5 pb-7 py-4'>
            <h2 className='text-3xl font-bold'> Get Started with Uber </h2>
            <Link to='/login' className='flex items-center justify-center bg-black w-full text-white py-3 rounded-lg mt-4'> Continue </Link>
        </div>
      </div>
    </div>
  )
}

export default Start
