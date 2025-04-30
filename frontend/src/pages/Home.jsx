import React, {useState, useRef} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'


const Home = () => {

  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  useGSAP(function() {
    if(panelOpen) {
      gsap.to(panelRef.current, {
        height: "100%",
        opacity:1,
        padding: 24
      })
      gsap.to(panelCloseRef.current,{
        opacity: 1
      })
    }else{
      gsap.to(panelRef.current, {
        height: "0%",
        opacity:0,
        padding:25
      })
      gsap.to(panelCloseRef.current,{
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function() {
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function() {
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function() {
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  useGSAP(function() {
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className="w-16 absolute top-5 ml-5 mb-5" src="https://1000marcas.net/wp-content/uploads/2020/10/Uber-Logo.png" alt=""/>
      <div onClick= {() => {
        setVehiclePanel(false)
      }} className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://turnaroundtalk.co.za/wp-content/uploads/2021/10/Uber-car-map.jpg" alt="" />
      </div>

      <div className='flex flex-col justify-end h-screen absolute bottom-0 w-full'>
        <div className='bg-white p-5 h-[24%] relative'>
        <h5 ref = {panelCloseRef}
          onClick={() => {
            setPanelOpen(false)
          }}
          className='absolute opacity-0 top-2 right-3 text-xl'>
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className='text-2xl font-semibold mb-3'>Find a trip</h4>
        <form onSubmit = {(e) => {
          submitHandler(e)
        }}>
          <div className="line absolute h-15 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
          <input 
            onClick={() => setPanelOpen(true)}
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
        
            className='bg-[#eee] px-12 py-2 mb-2 text-base w-full rounded-lg' 
            type="text" placeholder='Add a pick-up location' 
          />
          <input
            onClick={() => setPanelOpen(true)}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
        
            className='bg-[#eee] px-12 py-2 text-base w-full rounded-lg' 
            type="text" placeholder='Enter your destination'
          />
        </form>
        </div>
        <div ref = {panelRef} className='bg-white '>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full bg-white translate-y-full z-10 bottom-0 px-3 py-10 pt-12'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full bg-white translate-y-full z-10 bottom-0 px-3 py-6 pt-12'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full bg-white translate-y-full z-10 bottom-0 px-3 py-6 pt-12'>
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full bg-white z-10 bottom-0 px-3 py-6 pt-12'>
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>

  )
}

export default Home
