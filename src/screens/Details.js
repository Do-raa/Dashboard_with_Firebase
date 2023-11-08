import React, { useState, useEffect } from "react";
import backIcon from "../assets/back-icon.png";
import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "primereact/card";
import { Image } from "primereact/image"; 

export default function Details(props) {
  const [product, setProduct] = useState();
  const sizes = product?.selectedSizes.map((size) => <p>{size}</p>);
  const location = useLocation();
  const productId = location.state && location.state.productId;

  const navigate = useNavigate();

  useEffect(() => {
    const myProduct = props.products.find(
      (product) => product.documentId === productId
    );
    setProduct(myProduct);
  });

  const handleClick = () => {
    navigate("/profil/store");
  };

  return (
    <div className="bg-gray-100 w-screen flex flex-col justify-center ">
      <div className="pt-20 ml-24">
        <img
          src={backIcon}
          alt="back-icon"
          height={30}
          width={30}
          className="hover:opacity-60 cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div className="card flex items-center justify-center my-20">
        <Card
          className="w-5/6"
          title={
            <div className="text-teal-400 mt-8 ml-8">
              <div style={{ fontSize: "2.6rem", fontFamily: 'Courgette, cursive'}}>
                Product Information
              </div>
              <div className="mt-1 leading-6 text-gray-400 ">
                {product?.reference}
              </div>
            </div>
          }
        >
          <div className="flex flex-row">
            <div className="w-2/3 my-5 flex justify-center items-center mr-5">
              <Image
                src={product?.imgUrl}
                alt="Image"
                className=" shadow-xl shadow-gray-300"
                width="300"
                preview
              />
            </div>
            <div className="w-1/2 h-full">
              <div>
                <dl className="divide-y divide-teal-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {product?.name}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Category
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {product?.category}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Quantity
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {product?.quantity}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Size
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {sizes}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Purchase price
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {product?.purchasePrice}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Selling price
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {product?.sellingPrice}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Desciption
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {product?.description}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
