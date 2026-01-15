import { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);

  const [form, setForm] = useState({
    productName: "",
    price: "",
    brand: "",
    description: "",
    stock: "",
    stockStatus: "",
    rating: "",
    category: "",
    images: [],
  });

  /* INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* IMAGE UPLOAD */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((p) => ({ ...p, images: files }));
    setImagePreview(files.map((f) => URL.createObjectURL(f)));
  };

  /* SUBMIT (ADD / EDIT) */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.productName || !form.price || !form.stock || !form.category) {
      alert("Please fill required fields");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = form;
      setProducts(updated);
    } else {
      setProducts([...products, form]);
    }

    resetForm();
  };

  /* EDIT */
  const handleEdit = (index) => {
    setForm(products[index]);
    setEditingIndex(index);
    setImagePreview([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* DELETE */
  const handleDelete = (index) => {
    if (!window.confirm("Delete this product?")) return;
    setProducts(products.filter((_, i) => i !== index));
  };

  /* RESET */
  const resetForm = () => {
    setForm({
      productName: "",
      price: "",
      brand: "",
      description: "",
      stock: "",
      stockStatus: "",
      rating: "",
      category: "",
      images: [],
    });
    setEditingIndex(null);
    setImagePreview([]);
  };

  return (
    <div className="add-product-page">
      {/* FORM */}
      <div className="add-product">
        <h2>{editingIndex !== null ? "Edit Product" : "Add Product"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="productName"
            placeholder="Product name"
            value={form.productName}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock quantity"
            value={form.stock}
            onChange={handleChange}
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="books">Books</option>
            <option value="home">Home</option>
          </select>

          <select
            name="stockStatus"
            value={form.stockStatus}
            onChange={handleChange}
          >
            <option value="">Stock status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <input
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating (0–5)"
            value={form.rating}
            onChange={handleChange}
          />

          <input type="file" multiple onChange={handleImageChange} />

          <div className="preview">
            {imagePreview.map((img, i) => (
              <img key={i} src={img} alt="preview" />
            ))}
          </div>

          <div className="form-actions">
            <button type="submit">
              {editingIndex !== null ? "Update Product" : "Add Product"}
            </button>
            {editingIndex !== null && (
              <button type="button" className="cancel" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* PRODUCT LIST (DEMO) */}
      <div className="product-list">
        <h3>Products (Demo)</h3>

        {products.length === 0 ? (
          <p>No products added</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.productName}</td>
                  <td>₹{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button onClick={() => handleEdit(i)}>Edit</button>
                    <button
                      className="danger"
                      onClick={() => handleDelete(i)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
