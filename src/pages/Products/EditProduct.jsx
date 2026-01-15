import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Products.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    status: "active",
  });

  // Dummy fetch (backend later)
  useEffect(() => {
    // pretend backend response
    const product = {
      id,
      name: "iPhone 15",
      price: 85000,
      stock: 12,
      status: "active",
    };

    setForm(product);
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product:", form);

    alert("Product updated (dummy)");
    navigate("/products");
  };

  return (
    <div className="product-page">
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button>Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
