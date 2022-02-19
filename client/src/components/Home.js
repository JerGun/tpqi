import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { ReactComponent as Search } from "../assets/icons/search.svg";

function Home() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!keyword) fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    await axios
      .get("http://localhost:9000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = async () => {
    console.log(keyword);
    await axios
      .get(`http://localhost:9000/search?keyword=${keyword}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`${
        products.length > 2 && "h-full"
      } h-screen w-full p-10 py- space-y-5`}
    >
      <div className="h-11 flex space-x-5">
        <div className="h-full w-fit space-x-3 pl-3 flex items-center rounded-lg text-black shadow-md bg-white">
          <Search className="h-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="h-full w-full bg-transparent"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <button
            className="h-full px-5 rounded-r-lg text-white bg-blue-600"
            onClick={handleSearch}
          >
            <p>Search</p>
          </button>
        </div>
        <button
          className="h-full px-5 rounded-lg shadow-md text-white bg-gray-600"
          onClick={() => {
            window.location.reload();
          }}
        >
          <p>Reset</p>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-10">
        {products.map((product, i) => (
          <div
            key={i}
            className="h-96 w-full rounded-xl shadow-md flex justify-between bg-white"
          >
            <div className="h-full w-full flex break-words">
              <img
                src={product.picture}
                alt=""
                className="h-full w-5/12 object-cover rounded-l-xl"
              />
              <div className="w-1/2 p-3 space-y-3">
                <div>
                  <p className="font-bold">Product Name:</p>
                  <Link to={`${product._id}/edit`} className="text-blue-600">
                    {product.productName}
                  </Link>
                </div>
                <div>
                  <p className="font-bold">Product Description:</p>
                  <p className="text-gray-600 line-clamp-4">
                    {product.productDescription}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Category:</p>
                  <button className="text-gray-600">{product.category}</button>
                </div>
                <div>
                  <p className="font-bold">Price:</p>
                  <button className="text-gray-600">฿ {product.price}</button>
                </div>
                <div>
                  <p className="font-bold">Quantity Stock:</p>
                  <button className="text-gray-600">
                    {product.quantityStock}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
