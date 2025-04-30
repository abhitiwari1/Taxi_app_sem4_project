import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center w-[95%] absolute top-0' onClick = {()=>{
          props.setConfirmRidePanel
        }}><i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>
        <div className='flex gap-2 justify-between items-center flex-col'>
            <img className='h-30' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-t-2 border-gray-300'>
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
                props.setVehicleFound(true)
                props.setConfirmRidePanel(false)
            }} className='w-full text-xl text-white font-bold bg-black p-3 rounded-xl mt-5'>Confirm</button>
        </div>
    </div>
  )
}

export default ConfirmRide
