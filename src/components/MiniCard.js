import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const MiniCard = (props) => {
  return (
    <div className="flex justify-start items-center w-1/5 h-32 rounded-md overflow-hidden shadow-md shadow-teal-100 mr-5 mt-16 mb-5 bg-white">
      <div className="card-body flex flex-row">
        <div>
        { props.item.name.includes('Users')? <FontAwesomeIcon icon={faUsers} size="2x" mask={['fas', 'circle']} transform={['shrink-8']} bounce className="text-lime-300 mx-4"/> 
                                          : <FontAwesomeIcon icon={faCoins} size="2x" mask={['fas', 'circle']} transform={['shrink-8']} beatFade className="text-lime-300 mx-4"/>} 
        </div>
        <div>
        <h3 className="card-title text-black font-mono font-semibold text-xl mb-2">
          {props.item.name}
        </h3>
        <p className="card-description font-mono font-bold text-teal-500 text-base">
          {props.item.detail}
        </p>
        </div>
      </div>
    </div>
  );
};

export default MiniCard;

  