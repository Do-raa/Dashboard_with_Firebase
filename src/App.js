import SignIn from "./screens/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Profil from "./screens/Profil";
import Dashboard from "./screens/Dashboard";
import Products from "./screens/Products";
import Store from "./screens/Store";
import AddProduct from "./screens/AddProduct";
import Details from "./screens/Details";

import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import db from "./firebase/firebaseConfig";

function App() {
  const [products, setProducts] = useState([]);

  const editProduct = async (newData) => {
    const docRef = doc(db, "products", newData.documentId);
    console.log(newData);
    try {
      await setDoc(docRef, newData, { merge: true });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    setProducts(
      products.map((product) =>
        product.id === newData.id ? { ...newData } : product
      )
    );
  };

  // Get products from firestore
  async function getProducts() {
    const productsCol = collection(db, "products");
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map((doc) => {
      return { documentId: doc.id, ...doc.data() };
    });
    setProducts(productList);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/profil/dashboard" element={<Dashboard />} />
          <Route
            path="/profil/products"
            element={
              <Products
                products={products}
                editProduct={editProduct}
                getProducts={getProducts}
              />
            }
          />
          <Route
            path="/profil/store"
            element={<Store products={products} getProducts={getProducts} />}
          />
          <Route
            path="/profil/add-product"
            element={<AddProduct/>}
          />
          <Route
            path="/profil/product-details"
            element={<Details products={products} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
