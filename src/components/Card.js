import React from 'react';
import { useNavigate } from "react-router-dom";




const Card = (props) => {

  const navigate = useNavigate();

  const handleShowMoreClick = (productId) => {
    navigate('/profil/product-details', { state: { productId } });
  };

  return (
    <div className="w-72 h-96 rounded-lg overflow-hidden shadow-md shadow-gray-200 m-3">
      {props.product.imgUrl && <img
        src={props.product.imgUrl}
        alt={props.product.imgUrl}
        className="w-full h-1/2"
      />}
      <div className="card-body px-6 py-4 font-sans bg-white h-1/2">
        <h3 className="card-title font-bold text-xl mb-2 h-1/6 line-clamp-1 ">
          {props.product.name}
        </h3>
        <p className="card-description text-gray-500 text-base h-2/6 overflow-clip">
          {props.product.description}
        </p>
        <div className="mt-1">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 h-1/6">
            <p>{props.product.sellingPrice}</p>
          </span>
        </div>
        <div className="flex justify-center h-2/6 my-3">
        <button
      className="h-8 text-gray-900 text-sm bg-gray-100 font-semibold rounded-md ring ring-lime-200 ring-offset-2 hover:ring-offset-1 px-2 py-1"
      onClick={() => handleShowMoreClick(props.product.documentId)}
    >
      Show more
    </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
