import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useEffect, useState } from "react"; 

import { ProgressSpinner } from 'primereact/progressspinner';
        

const Store = (props) => {
  const navigation = [
    { name: "Dashboard", href: "/profil/dashboard", current: false },
    { name: "Products", href: "/profil/products", current: false },
    { name: "Store", href: "/profil/store", current: true },
  ];

  //const [myProducts, setMyProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    props.getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(props.products);
  }, [props.products]);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(props.products)
    if (value === "") {
      setError("")
      setFilteredProducts([...props.products]);
      
    } else {
      const filteredProducts = props.products.filter((product) =>
        product.name.toLowerCase().includes(value)
      );
      filteredProducts.length !== 0
        ? setFilteredProducts(filteredProducts)
        : setError("No available products");
    }
  };

  return (
    <div className="bg-gray-100 h-full w-screen pb-12">
      <Navbar navigation={navigation} />
      <div>
        <div className="flex items-center justify-center">
          <input
            placeholder="Search ..."
            onChange={handleInputChange}
            className="mb-20 mt-20 w-6/12 rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm shadow-teal-300 focus:ring-black placeholder:text-gray-500 focus:ring-2 sm:text-sm sm:leading-6"
          />
        </div>
        {error ? (
          <p className="flex items-center justify-center text-rose-600">
            {error}
          </p>
        ) : (
          <div className="flex items-center justify-center flex-wrap">
            {filteredProducts.length === 0 ? <div className="h-screen"><ProgressSpinner /> </div>: filteredProducts.map((product, id) => (
              <Card key={id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
