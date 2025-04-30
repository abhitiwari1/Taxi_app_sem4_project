import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center w-[95%] absolute top-0' onClick = {()=>{
          props.setVehiclePanel(false)
        }}><i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className='flex border-2 border-gray-300 active:border-black w-full mb-2 p-3 rounded-xl items-center justify-between'>
          <img className = 'h-14' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div>
            <h2 className='font-medium text-lg'>UberGo <span><i className="ri-user-fill">4</i></span></h2>
            <h4 className='font-medium'>2 mins away</h4>
            <p className='text-sm'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹ 193.20</h2>
        </div>

        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className='flex border-2 border-gray-300 active:border-black mb-2 p-2 w-full rounded-xl items-center justify-between'>
          <img className = 'h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div>
            <h2 className='font-medium text-lg'>Moto <span><i className="ri-user-fill">1</i></span></h2>
            <h4 className='font-medium'>3 mins away</h4>
            <p className='text-sm'>Affordable motorcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹ 65.17</h2>
        </div>

        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className='flex border-2 border-gray-300 active:border-black w-full mb-2 p-3 rounded-xl items-center justify-between'>
          <img className = 'h-14' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
          <div>
            <h2 className='font-medium text-lg'>UberAuto <span><i className="ri-user-fill">3</i></span></h2>
            <h4 className='font-medium'>2 mins away</h4>
            <p className='text-sm'>Affordable Auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹ 118.27</h2>
        </div>
    </div>
  )
}

export default VehiclePanel
