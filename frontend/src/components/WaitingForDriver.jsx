import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
       <h5 className='p-3 text-center w-[95%] absolute top-0' onClick = {()=>{
          props.WaitingForDriver(false)
        }}><i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i></h5>
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
        </div>
    </div>
  )
}

export default WaitingForDriver

