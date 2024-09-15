import React from "react";
import { Products as ProductsData } from "./data";
import Product from "./Product";
import "./ShopPage.css";

const Products = () => {
  return (
    <section className="products-section" id="products">
      <div className="products-container">
        {ProductsData.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;
