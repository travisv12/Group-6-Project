import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { icons, shopData } from "@/data/products";
import { MdLocationOn } from "react-icons/md";
import "./index.style.css";
import useCartStore from "@/hooks/useCartStore";

const Shop = () => {
  // Use global cart store methods
  const { cart, addToCart, updateQuantity } = useCartStore();
  const [products, setProducts] = useState(shopData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    minRating: 0,
    minPrice: 0,
    maxPrice: 100,
    company: "",
  });
  const [sortOrder, setSortOrder] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Get unique companies from shopData
  const companies = [...new Set(shopData.map((item) => item.company))];

  // Helper function to clean up price strings
  const parsePrice = (priceString) => {
    const cleanedPrice = priceString
      .replace(/[^\d,.-]/g, "") // Remove non-numeric characters except comma, dot, and minus
      .replace(",", "."); // Convert comma to dot if necessary
    return parseFloat(cleanedPrice);
  };

  // Apply search and filters when state changes
  useEffect(() => {
    let filteredProducts = shopData.filter((product) => {
      const productPrice = parsePrice(product.salePrice);
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        product.rating >= filters.minRating &&
        productPrice >= filters.minPrice &&
        productPrice <= filters.maxPrice &&
        (filters.company === "" || product.company === filters.company)
      );
    });

    // Apply sorting by price
    if (sortOrder === "asc") {
      filteredProducts.sort(
        (a, b) => parsePrice(a.salePrice) - parsePrice(b.salePrice)
      );
    } else if (sortOrder === "desc") {
      filteredProducts.sort(
        (a, b) => parsePrice(b.salePrice) - parsePrice(a.salePrice)
      );
    }

    setProducts(filteredProducts);
  }, [searchQuery, filters, sortOrder]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleShowMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  return (
    <div className="shop-container">
      <div className="shop-header">
        <img className="shop-header-image" src="/images/shop.png" alt="shop" />
        <div className="shop-header-overlay">
          <div className="shop-header-content">
            <h1 className="shop-header-title">SAVE NEAR-EXPIRED FOOD</h1>
            <p className="shop-header-subtitle">REDUCE FOOD WASTE TODAY</p>
          </div>
        </div>
      </div>
      <div className="shop-filters">
        <div className="shop-filters-container">
          <div className="shop-filters-header">
            <FiFilter className="shop-filters-icon" />
            <p className="shop-filters-title">Filter</p>
          </div>
          <div className="shop-filters-controls mt-5">
            <select
              className="shop-filters-select"
              name="company"
              id="company"
              value={filters.company}
              onChange={handleFilterChange}
            >
              <option value="">All Companies</option>
              {companies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
            <div className="shop-filters-sort">
              <div className="shop-filters-sort-buttons">
                <button
                  className={`shop-filters-sort-button ${
                    sortOrder === "asc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("asc")}
                >
                  Price{" "}
                  <FaArrowDown
                    size={18}
                    className="shop-filters-sort-icon inline"
                  />
                </button>
                <button
                  className={`shop-filters-sort-button ${
                    sortOrder === "desc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("desc")}
                >
                  Price{" "}
                  <FaArrowUp
                    size={18}
                    className="shop-filters-sort-icon inline"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Shop List */}
          <div className="shop-list">
            <div className="shop-list-grid">
              {products.slice(0, visibleProducts).map((product, index) => (
                <div key={index} className="shop-list-item">
                  <div className="shop-list-item-image-container">
                    <a href={product.link}>
                      <img
                        className="shop-list-item-image"
                        src={product.image}
                        alt={product.name}
                      />
                    </a>
                  </div>
                  <div className="shop-list-item-content">
                    <Link
                      to={`/recipes/details/${product?.id}`}
                      className="shop-list-item-title"
                    >
                      {product.name}
                    </Link>

                    <div className="shop-list-item-details">
                      <p className="shop-list-item-price">
                        {product.salePrice}
                      </p>
                      <p className="shop-list-item-price">{product.company}</p>
                      <p className="text-sm text-center">
                        <MdLocationOn className="mr-2 inline" />
                        {product.location}
                      </p>

                      <div className="shop-list-item-quantity">
                        <button
                          type="button"
                          className="shop-list-item-quantity-button"
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              (cart.find((item) => item.id === product.id)
                                ?.quantity || 0) - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span className="shop-list-item-quantity-value">
                          {cart.find((item) => item.id === product.id)
                            ?.quantity || 0}
                        </span>
                        <button
                          type="button"
                          className="shop-list-item-quantity-button"
                          onClick={() => addToCart(product)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="shop-list-item-add-to-cart">
                      <button
                        className="shop-list-item-add-to-cart-button"
                        type="button"
                        onClick={() => addToCart(product)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {visibleProducts < products.length && (
              <div className="w-full flex items-center justify-center gap-3 p-5">
                <button
                  onClick={handleShowMore}
                  className="p-3 rounded shadow bg-yellow-400 w-fit"
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
