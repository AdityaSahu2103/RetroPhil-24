import React from 'react';
import './ProductList.css';

const ProductList = ({ products }) => {
    console.log(products); // Check if products array is correct

    return (
        <div className="products">
            {products.map(product => (
                <div key={product.id} className="product-card ">
                    <h2 className="product-name">{product.name}</h2>
                    <div className="product-info">
                        <p className="product-price">₹ {product.price}</p>
                        <div className="add-to-cart">
                            <i className="fas fa-shopping-cart "></i> Add to Cart
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
