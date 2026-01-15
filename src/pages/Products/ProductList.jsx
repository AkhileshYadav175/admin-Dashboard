import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Products.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    // Dummy data (backend replace later)
    useEffect(() => {
        setTimeout(() => {
            setProducts([
                {
                    id: 1,
                    name: "iPhone 15",
                    price: 85000,
                    stock: 12,
                    status: "active",
                },
                {
                    id: 2,
                    name: "Samsung Galaxy S23",
                    price: 72000,
                    stock: 0,
                    status: "inactive",
                },
                {
                    id: 3,
                    name: "MacBook Pro",
                    price: 185000,
                    stock: 5,
                    status: "active",
                },
            ]);
            setLoading(false);
        }, 700);
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        setProducts(products.filter((p) => p.id !== id));
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div className="product-page">
            <div className="product-header">
                <h1>Products</h1>
                <p>Manage your store products</p>
            </div>

            <div className="product-table-wrapper">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty-row">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>₹{product.price}</td>
                                    <td>
                                        {product.stock > 0 ? product.stock : "Out of stock"}
                                    </td>
                                    <td>
                                        <span
                                            className={`status-badge ${product.status === "active"
                                                    ? "status-active"
                                                    : "status-inactive"
                                                }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/products/edit/${product.id}`)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
