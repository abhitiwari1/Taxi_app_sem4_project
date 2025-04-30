import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center w-[95%] absolute top-0' onClick = {()=>{
            props.setRidePopUpPanel(false)
        }}><i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
        <div className='flex justify-between items-center p-3 bg-yellow-400 rounded-lg'>
            <div className='flex items-center gap-3'>
                <img className='h-10 w-10 rounded-full object-cover' src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg" alt="" />
                <h3 className='text-lg font-medium'>Jhon Doe</h3>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>
        <div className='flex gap-2 justify-between items-center flex-col'>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-300'>
                    <i className="text-xl ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahmedabad</p>
                    </div>
                </div>
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
            <button onClick={()=>{
               props.setConfirmRidePopUpPanel(true)
            }} className='w-full text-xl text-white font-bold bg-green-600 p-2 rounded-xl mt-5'>Accept</button>
            <button onClick={()=>{
                props.setRidePopUpPanel(false)
            }} className='w-full text-xl text-white font-bold bg-gray-300 p-2 rounded-xl mt-2'>Ignore</button>
        </div>
    </div>
  )
}

export default RidePopUp
