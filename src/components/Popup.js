import React, { useEffect, useRef } from "react";
import { Divider } from 'primereact/divider';
import "./Popup.css"; 

function Popup(props) {
  const myRef = useRef(null);

  //  // Add event listener to close the popup when clicking outside
  //  useEffect(() => {
  
  //   myRef.current.addEventListener("click", (e) => {
  //     console.log()
  //    e.stopPropagation()
  //     props.onReject()
  //   })

  //   // // Cleanup the event listener when the component is unmounted
  //   // return () => {
  //   //   document.removeEventListener("mousedown", handleOutsideClick, true); // Use the capture phase
  //   // };
  // });

  return (
    <div className="popup" ref={myRef}>
      <div className="popup-content ">
        {/* Popup content goes here */}
        <h1 className="text-white mb-6 text-2xl font-semibold tracking-wider">
          Warning
        </h1>
        <Divider />
        <p>Are you sure you want to delete this product?</p>
        <div className="mt-8">
          <button
            className="mr-6 h-6 bg-lime-100 rounded-md ring ring-lime-200 ring-offset-2 px-2 hover:ring-1  hover:ring-lime-200"
            onClick={props.onApprove}
          >
            Yes
          </button>
          <button
            className="h-6 bg-yellow-100 rounded-md ring ring-yellow-100 ring-offset-2 px-2 hover:ring-1  hover:ring-yellow-200"
            onClick={props.onReject}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
