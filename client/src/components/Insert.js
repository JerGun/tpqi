import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Insert() {
  const params = useParams();
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    productName: "",
    picture: "",
    category: "",
    productDescription: "",
    price: "",
    quantityStock: "",
  });
  const [required, setRequired] = useState(false);

  useEffect(() => {
    let meta;
    const fetchProduct = async () => {
      meta = await axios.get(
        `http://localhost:9000/product?id=${params.productId}`
      );
      setFormInput({
        ...formInput,
        productName: meta.data.productName,
        category: meta.data.category,
        productDescription: meta.data.productDescription,
        price: meta.data.price,
        quantityStock: meta.data.quantityStock,
        picture: meta.data.picture,
      });
    };
    if (params.productId) {
      fetchProduct();
    }
  }, []);

  const handleSubmit = async () => {
    if (
      !formInput.productName ||
      !formInput.picture ||
      !formInput.category ||
      !formInput.productDescription ||
      !formInput.price ||
      !formInput.quantityStock
    ) {
      setRequired(true);
      return;
    } else {
      setRequired(false);
    }

    if (params.productId) {
      let data = {
        productId: params.productId,
        productName: formInput.productName,
        picture: formInput.picture,
        category: formInput.category,
        productDescription: formInput.productDescription,
        price: formInput.price,
        quantityStock: formInput.quantityStock,
      };
      try {
        console.log(data);
        await axios
          .put("http://localhost:9000/product", data)
          .then(navigate("/"))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios
          .post("http://localhost:9000/product", formInput)
          .then(navigate("/"))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:9000/product?id=${params.productId}`)
      .then(navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-full w-full py-5 flex justify-center space-x-10">
      <div className="h-full w-1/2 py-5  px-10 space-y-10 bg-white rounded-xl shadow-lg">
        <div className="space-y-5">
          <div className="space-y-1">
            <div className="flex space-x-1">
              <p>Product name</p>
              <p className="text-red-500">*</p>
            </div>
            <div className="h-11 rounded-lg text-black bg-white border-2 border-black border-opacity-20">
              <input
                type="text"
                placeholder="Product name"
                className="h-full w-full px-3 bg-transparent"
                value={formInput.productName}
                onChange={(e) => {
                  setFormInput({
                    ...formInput,
                    productName: e.target.value,
                  });
                }}
              />
              {required && !formInput.productName && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex space-x-1">
              <p>Image</p>
              <p className="text-red-500">*</p>
            </div>
            <div className="h-11 rounded-lg text-black bg-white border-2 border-black border-opacity-20">
              <input
                type="text"
                placeholder="Image link"
                className="h-full w-full px-3 bg-transparent"
                value={formInput.picture}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    picture: e.target.value,
                  })
                }
              />
              {required && !formInput.picture && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex space-x-1">
              <p>Category</p>
              <p className="text-red-500">*</p>
            </div>
            <div className="h-11 rounded-lg text-black bg-white border-2 border-black border-opacity-20">
              <input
                type="text"
                placeholder="Category"
                className="h-full w-full px-3 bg-transparent"
                value={formInput.category}
                onChange={(e) => {
                  setFormInput({
                    ...formInput,
                    category: e.target.value,
                  });
                }}
              />
              {required && !formInput.category && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex space-x-1">
              <p>Product Description</p>
              <p className="text-red-500">*</p>
            </div>
            <div className="h-11 rounded-lg text-black bg-white border-2 border-black border-opacity-20">
              <input
                type="text"
                placeholder="Product Description"
                className="h-full w-full px-3 bg-transparent"
                value={formInput.productDescription}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    productDescription: e.target.value,
                  })
                }
              />
              {required && !formInput.productDescription && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex space-x-1">
              <p>Price</p>
              <p className="text-red-500">*</p>
            </div>
            <div className="h-11 rounded-lg text-black bg-white border-2 border-black border-opacity-20">
              <input
                type="number"
                min={0}
                placeholder="Price"
                className="h-full w-full px-3 bg-transparent"
                value={formInput.price}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    price: e.target.value,
                  })
                }
              />
              {required && !formInput.price && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex space-x-1">
              <p>Quantity Stock</p>
              <p className="text-red-500">*</p>
            </div>
            <div className="h-11 rounded-lg text-black bg-white border-2 border-black border-opacity-20">
              <input
                type="number"
                min={0}
                placeholder="Quantity Stock"
                className="h-full w-full px-3 bg-transparent"
                value={formInput.quantityStock}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    quantityStock: e.target.value,
                  })
                }
              />
              {required && !formInput.quantityStock && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="h-11 w-full rounded-lg shadow-md font-bold text-white bg-blue-600"
          >
            {params.productId ? "Edit" : "Add"}
          </button>
          {params.productId && (
            <button
              type="submit"
              onClick={handleDelete}
              className="h-11 w-1/2 rounded-lg shadow-md font-bold text-white bg-red-600"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            onClick={() => {
              navigate("/");
            }}
            className="h-11 w-1/2 rounded-lg shadow-md font-bold text-white bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Insert;
