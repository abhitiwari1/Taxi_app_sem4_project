
import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)

    return (
        <div>
            <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-3'><img className='h-10 w-10 rounded-full object-cover' src={captain.profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="Captain Avatar" />
            
            <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
            </div>
            <div>
            <h4 className='text-xl font-semibold'>{captain.numberOfRides}</h4>
            <p className='text-sm text-gray-600'>Number of Rides</p>
            </div>
            </div>
            <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-center'>
            <div className='text-center'>
            <h5 className='text-lg font-medium'>Rating</h5>
            <div className='flex gap-1'>
            {[...Array(5)].map((_, index) => (
            <i
            key={index}
            className={`text-2xl ${
            index < captain.rating ? 'text-yellow-500' : 'text-gray-300'
            } ri-star-fill`}
            ></i>
            ))}
            </div>
            </div>
            </div>
            <p className='mt-4 text-center text-sm text-gray-500'>
            You will be notified promptly when a rider requests a ride.
            </p>
        </div>
        )
}

export default CaptainDetails