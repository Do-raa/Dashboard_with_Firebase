import backIcon from "../assets/back-icon.png";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import './AddProduct.css'

import { HandleImageUrl } from "../components/HandleImageUrl";

import { collection, addDoc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

const AddProduct = (props) => {
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    id: Math.random().toString(),
    reference: "",
    name: "",
    imgUrl: "",
    quantity: "",
    category: "",
    selectedSizes: [],
    description: "",
    purchasePrice: "",
    sellingPrice: "",
  });
  const [file, setFile] = useState("");
  const sizes = ["XS", "S", "M", "L", "XL", "2XL"];
  const categories = ["Men", "Women", "Children"];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profil/dashboard");
  };

  const validateProduct = () => {
    console.log(product)
    if (!product.reference) {
      errors.reference = "Reference is required.";
    } else if (!/^[A-Z0-9]+$/.test(product.reference)) {
      errors.reference =
        "Reference must contain only capital letters and numbers.";
    }

    if (!product.name) {
      errors.name = "Name is required.";
    }

    if (!file) {
      errors.file = "File is required.";
    }

    if (!product.quantity) {
      errors.quantity = "Quantity is required.";
    }

    if (!product.category) {
      errors.category = "Category is required.";
    }

    if (product.selectedSizes.length === 0) {
      console.log(product.selectedSizes)
      errors.size = "Size is required.";
    }

    if (!product.description) {
      errors.description = "Description is required.";
    }

    if (!product.purchasePrice) {
      errors.purchasePrice = "Purchase price is required.";
    } else if (
      isNaN(product.purchasePrice) ||
      parseFloat(product.purchasePrice) <= 0
    ) {
      errors.purchasePrice = "Purchase price must be a valid positive number.";
    }

    if (!product.sellingPrice) {
      errors.sellingPrice = "Selling price is required.";
    } else if (
      isNaN(product.sellingPrice) ||
      parseFloat(product.sellingPrice) <= 0
    ) {
      errors.sellingPrice = "Selling price must be a valid positive number.";
    }

    return errors;
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const validationErrors = validateProduct();
    const url = await HandleImageUrl(file);

    const p_price = formatPrice(product.purchasePrice);
    const s_price = formatPrice(product.sellingPrice);

    if (Object.values(validationErrors).every((el) => el?.length === 0)) {
      try {
        await addDoc(collection(db, "products"), {
          ...product,
          imgUrl: url,
          purchasePrice: p_price,
          sellingPrice: s_price,
        });
        console.log("Document written with ID: ", product.id);
      } catch (e) {
        console.error("Error adding product to db: ", e);
      }
      navigate("/profil/store");
    } else {
      setErrors({ ...validationErrors }); // Update the state to display the errors
    }
  };

  const handleFileInputChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setFile(file);
    setErrors({ ...errors, file: "" });
  };

  const formatPrice = (price) => {
    let number = Number(price);

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  const handlePurchasePrice = (e) => {
    setProduct({ ...product, purchasePrice: e.target.value });
    setErrors({ ...errors, purchasePrice: "" });
  };

  const handleSellingPrice = (e) => {
    setProduct({ ...product, sellingPrice: e.target.value });
    setErrors({ ...errors, sellingPrice: "" });
  };
  return (
    <div className="bg-slate-50 px-32 pb-10 w-screen">
      <div className="pt-20">
        <img
          src={backIcon}
          alt="back-icon"
          height={30}
          width={30}
          className="hover:opacity-60 cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div>
        <h1 className="font-bold text-2xl tracking-widest text-teal-400 pb-10 text-center">
          ADD PRODUCT
        </h1>
        <div className="flex flex-row">
          <div className="w-1/2 mr-5">
            <label
              htmlFor="name"
              className="block text-sm text-left font-medium leading-6 text-gray-900 mt-2"
            >
              Reference
            </label>

            <input
              type="text"
              name="reference"
              id="reference"
              className="block w-full shadow-sm  mt-2 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
              placeholder="e.g : DN701"
              value={product.reference}
              onChange={(e) =>
                setProduct({ ...product, reference: e.target.value }) &
                setErrors({ ...errors, reference: "" })
              }
            />
            {errors.reference && (
              <span className="error text-rose-600">{errors.reference}</span>
            )}
          </div>

          <div className="w-1/2">
            <label
              htmlFor="name"
              className="block text-sm text-left font-medium leading-6 text-gray-900 mt-2"
            >
              Name
            </label>

            <input
              type="text"
              name="name"
              id="name"
              className="block w-full mt-2 shadow-sm rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
              placeholder="e.g : T-shirt"
              value={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value }) &
                setErrors({ ...errors, name: "" })
              }
            />
            {errors.name && (
              <span className="error text-rose-600">{errors.name}</span>
            )}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 mr-5">
            <label
              htmlFor="name"
              className="block text-sm text-left font-medium leading-6 text-gray-900 mt-2"
            >
              Photo
            </label>
            <div>
              <input
                type="file"
                name="photo"
                id="photo"
                className="block w-full rounded-md shadow-sm border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                placeholder="e.g : T-shirt"
                onChange={handleFileInputChange}
              />
              {errors.file && (
                <span className="error text-rose-600">{errors.file}</span>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="quantity"
              className="block text-sm text-left font-medium leading-6 text-gray-900 mt-2"
            >
              Quantity
            </label>
            <div>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="block w-full rounded-md shadow-sm border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                placeholder="0"
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value }) &
                  setErrors({ ...errors, quantity: "" })
                }
              />
              {errors.quantity && (
                <span className="error text-rose-600">{errors.quantity}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 mr-5">
            <label
              htmlFor="category"
              className="block text-sm text-left font-medium leading-6 text-gray-900 mt-2"
            >
              Category
            </label>

            <Dropdown
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value }) &
                setErrors({ ...errors, category: "" })
              }
              options={categories}
              placeholder="Select a Category"
              className="w-full md:w-14rem"
            />
            {errors.category && (
              <span className="error text-rose-600">{errors.category}</span>
            )}
          </div>

          <div className="w-1/2">
            <label
              htmlFor="size"
              className="block text-sm text-left font-medium leading-6 text-gray-900 mt-2"
            >
              Sizes
            </label>
            <div className="card flex justify-content-center">
              <MultiSelect
                value={product.selectedSizes}
                onChange={(e) =>
                  setProduct({ ...product, selectedSizes: e.value }) &
                  setErrors({ ...errors, size: "" })
                }
                options={sizes}
                placeholder="Select Sizes"
                maxSelectedLabels={7}
                className="w-full md:w-20rem"
              />
            </div>
            {errors.size && (
              <span className="error text-rose-600">{errors.size}</span>
            )}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 mr-5">
            <label
              htmlFor="price"
              className="block text-sm text-left font-medium leading-6 text-gray-900 mt-2"
            >
              Purchase Price
            </label>
            <div>
              <input
                type="number"
                name="price"
                id="price"
                className="block w-full rounded-md shadow-sm border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                placeholder="0.00 USD"
                value={product.purchasePrice}
                onChange={(e) => handlePurchasePrice(e)}
              />
            </div>
            {errors.purchasePrice && (
              <span className="error text-rose-600">
                {errors.purchasePrice}
              </span>
            )}
          </div>
          <div className="w-1/2">
            <label
              htmlFor="price"
              className="block text-sm text-left font-medium leading-6 text-gray-900 mt-2"
            >
              Selling Price
            </label>
            <div>
              <input
                type="number"
                className="block w-full rounded-md shadow-sm border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                placeholder="0.00 USD"
                value={product.sellingPrice}
                onChange={(e) => handleSellingPrice(e)}
              />
            </div>
            {errors.sellingPrice && (
              <span className="error text-rose-600">{errors.sellingPrice}</span>
            )}
          </div>
        </div>
        <label
          htmlFor="name"
          className="block text-sm text-left font-medium leading-6 text-gray-900 mt-2"
        >
          Description
        </label>
        <div>
          <textarea
            rows={4}
            cols={50}
            type="textarea"
            name="description"
            id="description"
            className="block w-full rounded-md shadow-sm border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
            placeholder="e.g : This T-shirt was made with coton ..."
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value }) &
              setErrors({ ...errors, description: "" })
            }
          />
          {errors.description && (
            <span className="error text-rose-600">{errors.description}</span>
          )}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={addProduct}
            className="text-md font-medium leading-6 text-gray-900 rounded border-2 bg-gradient-to-r from-teal-400 to-lime-400 hover:opacity-60 py-2 px-6 tracking-wider"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
