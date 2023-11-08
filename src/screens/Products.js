import Navbar from "../components/Navbar";
import "./Products.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber"; 
import { ProgressSpinner } from 'primereact/progressspinner';

import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme from PrimeReact
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { HandleImageUrl } from "../components/HandleImageUrl";
import Popup from "../components/Popup";

import db from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

const Products = (props) => {
  const navigation = [
    { name: "Dashboard", href: "/profil/dashboard", current: false },
    { name: "Products", href: "/profil/products", current: true },
    { name: "Store", href: "/profil/store", current: false },
  ];

  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sellingPrice: { value: null, matchMode: FilterMatchMode.EQUALS },
    purchasePrice: { value: null, matchMode: FilterMatchMode.EQUALS },
    quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [isPopupOpen, setPopupOpen] = useState(false);
  const categories = ["Men", "Women", "Children"];
  const sizes = ["XS", "S", "M", "L", "XL", "2XL"]; 

  useEffect(() => {
    props.getProducts();
  }, []);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const removeProduct = (id) => {
    let _products = products.filter((val) => val.documentId !== id);
    setProducts(_products);
  };

  const approvedPopup = async () => {
    try {
      await deleteDoc(doc(db, "products", productId));
      removeProduct(productId);
      setPopupOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const refusedPopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.imgUrl}
        alt={rowData.name}
        width="64px"
        className="rounded-md shadow-sm shadow-gray-200 h-20"
      />
    );
  };

  const deleteBodyTemplate = (rowData) => {
    return (
      <div>
        <button
          onClick={() => openPopup() & setProductId(rowData.documentId)}
          className="text-rose-600 font-medium hover:text-rose-400"
        >
          X
        </button>
        {isPopupOpen && (
          <Popup onApprove={approvedPopup} onReject={refusedPopup} />
        )}
      </div>
    );
  };

  const onRowEditComplete = async (e) => {
    let { newData } = e;
    const url = await HandleImageUrl(newData.field_2);

    let editedProductIndex = products.findIndex(
      (product) => product.id === newData.id
    );
    let updatedProducts = [...products];

    delete newData.field_2;
    newData.imgUrl = url;

    updatedProducts[editedProductIndex] = newData;
    console.log(updatedProducts);
    setProducts(updatedProducts);
    props.editProduct(newData);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const purchasePriceEditor = (options) => {
    const value =
      typeof options.value === "string"
        ? parseFloat(options.value.replace("$", ""))
        : options.value;
    return (
      <InputNumber
        value={value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  const sellingPriceEditor = (options) => {
    const value =
      typeof options.value === "string"
        ? parseFloat(options.value.replace("$", ""))
        : options.value;
    return (
      <InputNumber
        value={value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  const sellingPriceBodyTemplate = (rowData) => {
    const usdRegex = /^\$(\d{1,3}(,\d{3})*|(\d+))(\.\d{2})?$/;
    if (!usdRegex.test(rowData.sellingPrice)) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(rowData.sellingPrice);
    } else {
      return rowData.sellingPrice;
    }
  };

  const purchasePriceBodyTemplate = (rowData) => {
    const usdRegex = /^\$(\d{1,3}(,\d{3})*|(\d+))(\.\d{2})?$/;
    if (!usdRegex.test(rowData.purchasePrice)) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(rowData.purchasePrice);
    } else {
      return rowData.purchasePrice;
    }
  };

  const sizesBodyTemplate = (rowData) => {
    return (
      <div>
        {rowData.selectedSizes?.map((size) => (
          <p>{size}</p>
        ))}
      </div>
    );
  };

  const photoEditor = (options) => {
    console.log(options)
    return (
      <InputText
        type="file"
        onChange={(e) => options.editorCallback(e.target.files[0])}
      />
    );
  };

  const categoryEditor = (options) => {
    return (
      <Dropdown
        value={options?.value}
        onChange={(e) => options.editorCallback(e.target.value)}
        options={categories}
      />
    );
  };

  const quantityEditor = (options) => {
    return (
      <InputText
        type="number"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const sizeEditor = (options) => {
    console.log(options);
    return (
      <MultiSelect
        value={options.value}
        onChange={(e) => options.editorCallback(e.value)}
        options={sizes}
      />
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div id="products">
      <Navbar navigation={navigation} />
      <div className="mt-20 mb-8 ml-40 font-serif font-extrabold text-3xl tracking-wide ">
        <h2>Products</h2>
      </div>
      <div className="flex justify-center items-center">
       {products.length === 0 ? <ProgressSpinner />: <DataTable
          value={products}
          editMode="row"
          dataKey="id"
          filters={filters}
          globalFilterFields={[
            "reference",
            "name",
            "sellingPrice",
            "purchasePrice",
            "quantity",
          ]}
          header={header}
          emptyMessage="No products found."
          onRowEditComplete={onRowEditComplete}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className="p-datatable w-4/5"
        >
          <Column
            field="reference"
            header="Reference"
            editor={(options) => textEditor(options)}
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="name"
            header="Name"
            editor={(options) => textEditor(options)}
            style={{ width: "10%" }}
          ></Column>
          <Column
            header="Image"
            body={imageBodyTemplate}
            style={{ width: "10%" }}
            editor={(options) => photoEditor(options)}
          />
          <Column
            field="category"
            header="Category"
            editor={(options) => categoryEditor(options)}
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="quantity"
            header="Quantity"
            editor={(options) => quantityEditor(options)}
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="selectedSizes"
            header="Sizes"
            body={sizesBodyTemplate}
            editor={(options) => sizeEditor(options)}
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="purchasePrice"
            header="Purchase Price"
            body={purchasePriceBodyTemplate}
            editor={(options) => purchasePriceEditor(options)}
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="sellingPrice"
            header="Selliing Price"
            body={sellingPriceBodyTemplate}
            editor={(options) => sellingPriceEditor(options)}
            style={{ width: "10%" }}
          ></Column>
          <Column rowEditor header="Edit" bodyStyle={{ width: "10%" }}></Column>
          <Column
            header="Delete"
            body={deleteBodyTemplate}
            bodyStyle={{ width: "10%" }}
          ></Column>
        </DataTable>}
      </div>
    </div>
  );
};

export default Products;
