import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { icons, shopData } from "@/data/products";
import useCart from "@/hooks/useCart";
import "./index.style.css";

const Shop = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
  } = useCart();
  const [products, setProducts] = useState(shopData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    minRating: 0,
    minPrice: 0,
    maxPrice: 100,
    company: "",
  });
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Get unique companies from shopData
  const companies = [...new Set(shopData.map((item) => item.company))];

  // Apply search and filters when state changes
  useEffect(() => {
    let filteredProducts = shopData.filter((product) => {
      const productPrice = parseFloat(product.price.replace("$", ""));
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        product.rating >= filters.minRating &&
        productPrice >= filters.minPrice &&
        productPrice <= filters.maxPrice &&
        (filters.company === "" || product.company === filters.company)
      );
    });

    // Apply sorting
    if (sortOrder === "asc") {
      filteredProducts.sort(
        (a, b) =>
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
      );
    } else if (sortOrder === "desc") {
      filteredProducts.sort(
        (a, b) =>
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
      );
    }

    setProducts(filteredProducts);
    setCurrentPage(1); // Reset to first page when filters or sorting change
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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

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
              {/* <p className="shop-filters-sort-title">Sort by Price:</p> */}
              <div className="shop-filters-sort-buttons">
                <button
                  className={`shop-filters-sort-button ${
                    sortOrder === "asc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("asc")}
                >
                 Price{" "}
                  <FaArrowUp size={18} className="shop-filters-sort-icon inline" />
                </button>
                <button
                  className={`shop-filters-sort-button ${
                    sortOrder === "desc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("desc")}
                >
                 Price{" "}
                  <FaArrowDown size={18} className="shop-filters-sort-icon inline" />
                </button>
              </div>
            </div>
          </div>
          {/* Shop List */}
          <div className="shop-list">
            <div className="shop-list-grid">
              {currentProducts.map((product, index) => (
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
                      <p className="shop-list-item-price">{product.price}</p>

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

            {/* Pagination */}
            <div className="shop-pagination">
              {[
                ...Array(Math.ceil(products.length / productsPerPage)).keys(),
              ].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => handlePagination(number + 1)}
                  className={`shop-pagination-button ${
                    currentPage === number + 1 ? "active" : ""
                  }`}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* You can add a cart summary here
      <div className="shop-cart-summary">
        <p>Total Items in Cart: {getCartItemsCount()}</p>
        <p>Total Price: ${getCartTotal().toFixed(2)}</p>
      </div> */}
    </div>
  );
};

export default Shop;
