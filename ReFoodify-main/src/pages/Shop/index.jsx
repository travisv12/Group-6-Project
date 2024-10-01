import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { icons, shopData } from "@/data/products";
import useCart from "@/hooks/useCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { updateItemQuantity } from "../../redux/slices/cartSlice";
import almond_milk from "@/assets/almond-milk.png";
import "./index.style.css";

const Shop = () => {
  const dispatch = useDispatch();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
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

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get unique companies from products
  const companies = [...new Set(products.map((item) => item.store))];

  // Helper function to clean up price strings
  const parsePrice = (priceString) => {
    if (priceString === undefined || priceString === null) {
      console.log("Price string is undefined or null:", priceString);
      return 0; // or any default value you prefer
    }
    const cleanedPrice = priceString
      .toString()
      .replace(/[^\d,.-]/g, "") // Remove non-numeric characters except comma, dot, and minus
      .replace(",", "."); // Convert comma to dot if necessary
    const parsedPrice = parseFloat(cleanedPrice);
    return parsedPrice;
  };

  // Apply search and filters when state changes
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters or sorting change
  }, [searchQuery, filters, sortOrder]);

  const filteredProducts = products.filter((product) => {
    const productPrice = parsePrice(product.discountedPrice);
    const productRating = product.rating !== undefined ? product.rating : 5;

    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      productRating >= filters.minRating &&
      productPrice >= filters.minPrice &&
      productPrice <= filters.maxPrice &&
      (filters.company === "" || product.store === filters.company)
    );
  });

  // Apply sorting by price
  const sortedProducts = [...filteredProducts];
  if (sortOrder === "asc") {
    sortedProducts.sort(
      (a, b) => parsePrice(a.discountedPrice) - parsePrice(b.discountedPrice)
    );
  } else if (sortOrder === "desc") {
    sortedProducts.sort(
      (a, b) => parsePrice(b.discountedPrice) - parsePrice(a.discountedPrice)
    );
  }

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
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateItemQuantity({ productId, quantity }));
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
              {/* <p className="shop-filters-sort-title">Sort by Price:</p> */}
              <div className="shop-filters-sort-buttons">
                <button
                  className={`shop-filters-sort-button ${
                    sortOrder === "asc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("asc")}
                >
                  Price{" "}
                  <FaArrowUp
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
                  <FaArrowDown
                    size={18}
                    className="shop-filters-sort-icon inline"
                  />
                </button>
              </div>
            </div>
          </div>
          {/* Shop List */}
          <div className="shop-list">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <div className="shop-list-grid">
                {currentProducts.map((product, index) => (
                  <div key={index} className="shop-list-item">
                    <div className="shop-list-item-image-container">
                      <a href={product.link}>
                        <img
                          className="shop-list-item-image"
                          src={product.image || almond_milk}
                          alt={product.name}
                        />
                      </a>
                    </div>
                    <div className="shop-list-item-content">
                      <Link
                        to={`/recipes/details/${product._id}`}
                        className="shop-list-item-title"
                      >
                        {product.name}
                      </Link>

                      <div className="shop-list-item-details">
                        <p className="shop-list-item-price">
                          Discount price:{" "}
                          <span className="shop-list-item-price-value">
                            ${product.discountedPrice}
                          </span>
                        </p>
                        <p className="shop-list-item-actual-price">
                          Actual Price: ${product.price}
                        </p>

                        <div className="shop-list-item-quantity">
                          <button
                            type="button"
                            className="shop-list-item-quantity-button"
                            onClick={() =>
                              handleUpdateQuantity(
                                product._id,
                                (cart.find((item) => item.id === product._id)
                                  ?.quantity || 0) - 1
                              )
                            }
                          >
                            -
                          </button>
                          <span className="shop-list-item-quantity-value">
                            {cart.find((item) => item.id === product._id)
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
            )}

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
