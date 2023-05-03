import React from "react";
import { useState, useEffect } from "react";

export default function EditProducts() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [viewer4, setViewer4] = useState(false);
  const [oneProduct, setOneProduct] = useState([]);
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getAllProducts(); //any happen once when I load webpage
  }, []);

  // new Product
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });

  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  useEffect(() => {
    getAllProducts();
  }, [checked4]);

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }

  return (
    <div className="bg-white max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        <h4>Read a product</h4>
      </div>

      <div className="mt-6 space-y-4">
        <h4>Create a product</h4>
      </div>

      <div className="mt-6 space-y-4">
        <h4>Update a product</h4>
      </div>

      <div className="mt-6 space-y-4">
        <h4>Delete a product</h4>
        <input
          type="checkbox"
          id="acceptdelete"
          name="acceptdelete"
          checked={checked4}
          onChange={(e) => setChecked4(!checked4)}
        />
        <button
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          onClick={() => getOneByOneProductPrev()}
        >
          Prev
        </button>
        <button
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          onClick={() => getOneByOneProductNext()}
        >
          Next
        </button>
        <button
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          onClick={() => deleteOneProduct(product[index]._id)}
        >
          Delete
        </button>
        {checked4 && (
          <div key={product[index]._id}>
            <img src={product[index].image} width={30} /> <br />
            Id:{product[index]._id} <br />
            Title: {product[index].title} <br />
            Category: {product[index].category} <br />
            Price: {product[index].price} <br />
            Rate :{product[index].rating.rate} and Count:
            {product[index].rating.count} <br />
          </div>
        )}
      </div>
    </div>
  );
}
