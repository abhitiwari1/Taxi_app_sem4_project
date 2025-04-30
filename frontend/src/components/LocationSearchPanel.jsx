import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "B2,Near Kappor's Cafe, Faculty of Technology,University of Delhi",
    "B2A,Near Tiwari's Cafe, Faculty of Technology,University of Delhi",
    "B2C,Near Singhania's Cafe, Faculty of Technology,University of Delhi",
    "B2R,Near Malhotra's Cafe, Faculty of Technology,University of Delhi",
  ];
  return (
    <div>
      {locations.map(function (elem, idx) {
        return (
          <div key = {idx} onClick={() => {
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} className="flex border-2 p-3 border-white active:border-black rounded-xl items-center justify-start my-2 gap-4">
            <h2 className="bg-[#eee] flex items-center justify-center h-7 w-11 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
